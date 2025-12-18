# VoiceGuard Backend Deployment Guide

## 🚀 Render Deployment Checklist

### Prerequisites
- [ ] GitHub repository connected to Render
- [ ] Firebase service account key ready
- [ ] Frontend URL for CORS configuration

### Environment Variables Required

Set these in Render Dashboard → Environment:

```bash
# Required
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production

# Firebase Admin SDK (choose ONE method)
# Method 1: Service Account Key as JSON string (recommended for Render)
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}

# Method 2: Individual Firebase fields (alternative)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

### Deployment Steps

#### 1. Initial Setup
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `voiceguard-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (or paid for better performance)

#### 2. Configure Environment Variables
1. In Render dashboard, go to **Environment**
2. Add all required environment variables listed above
3. **Important:** For `FIREBASE_SERVICE_ACCOUNT_KEY`, paste the entire JSON as a single line

#### 3. Deploy
1. Click **Create Web Service**
2. Wait for build to complete (5-10 minutes)
3. Note your API URL: `https://voiceguard-api.onrender.com`

#### 4. Verify Deployment
```bash
# Test health endpoint
curl https://voiceguard-api.onrender.com/health

# Expected response:
# {"status":"success","message":"VoiceGuard API is running","timestamp":"..."}

# Test detect endpoint (should return 400 without file)
curl -X POST https://voiceguard-api.onrender.com/api/detect

# Expected response:
# {"status":"error","message":"No file uploaded. Please provide a media file."}
```

---

## 🔧 Troubleshooting

### Issue: "Endpoint not found" on /api/detect

**Possible Causes:**
1. Outdated code on Render
2. Build failed silently
3. Environment variables missing

**Solutions:**
```bash
# 1. Trigger manual redeploy
# Go to Render Dashboard → Your Service → Manual Deploy → Deploy latest commit

# 2. Check build logs
# Render Dashboard → Your Service → Logs → Build Logs
# Look for errors during npm install or startup

# 3. Check runtime logs
# Render Dashboard → Your Service → Logs → Runtime Logs
# Verify you see: "✅ All routes registered successfully"

# 4. Clear build cache
# Render Dashboard → Your Service → Settings → Clear Build Cache & Deploy
```

### Issue: CORS Errors

**Check:**
1. `FRONTEND_URL` environment variable is set correctly
2. No trailing slash in `FRONTEND_URL`
3. Protocol matches (https:// for production)

**Fix:**
```bash
# Update environment variable
FRONTEND_URL=https://voice-ruby-eta.vercel.app
# (no trailing slash)

# Then redeploy
```

### Issue: Firebase Connection Errors

**Check:**
1. Service account key is valid JSON
2. No extra whitespace or line breaks
3. All required Firebase permissions granted

**Fix:**
```bash
# Validate your JSON locally
node -e "console.log(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))"

# If error, regenerate key from Firebase Console:
# Firebase Console → Project Settings → Service Accounts → Generate New Private Key
```

### Issue: Rate Limiting Not Working

**Cause:** `express-rate-limit` requires `trust proxy` setting

**Verify in server.js:**
```javascript
app.set('trust proxy', 1); // Should be present
```

---

## 📊 Monitoring

### Health Check
Set up monitoring with:
- **UptimeRobot** (free)
- **Render Health Checks** (built-in)

Monitor: `https://voiceguard-api.onrender.com/health`

### Logs
```bash
# View real-time logs
# Render Dashboard → Your Service → Logs

# Look for:
# ✅ "All routes registered successfully"
# ✅ "VoiceGuard API Server Started"
# ❌ Any error messages
```

---

## 🔄 Updating the Backend

### Method 1: Git Push (Recommended)
```bash
# Make changes locally
git add .
git commit -m "Update backend"
git push origin main

# Render auto-deploys on push
```

### Method 2: Manual Deploy
1. Render Dashboard → Your Service
2. **Manual Deploy** → Deploy latest commit

---

## 🔐 Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore`
   - Use Render environment variables

2. **Rotate Firebase keys regularly**
   - Every 90 days recommended

3. **Use HTTPS only**
   - Render provides free SSL

4. **Monitor rate limits**
   - Check logs for 429 errors
   - Adjust limits if needed

---

## 📝 Quick Reference

### API Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/api/detect` | POST | Upload & detect deepfake |

### Response Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad request (missing file/userId) |
| 404 | Endpoint not found |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

### Environment Variables
| Variable | Required | Example |
|----------|----------|---------|
| `PORT` | No (defaults to 5000) | `5000` |
| `FRONTEND_URL` | Yes | `https://app.vercel.app` |
| `NODE_ENV` | No | `production` |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Yes | `{"type":"service_account",...}` |

---

## 🆘 Getting Help

If issues persist:
1. Check Render status page: https://status.render.com/
2. Review Render logs for errors
3. Test locally first: `npm start`
4. Verify all environment variables are set
