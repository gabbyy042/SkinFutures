# SkinFutures Deployment Guide

## Quick Deploy to Vercel (Free)

### Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Firebase project (create at console.firebase.google.com)

### Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing
3. Enable:
   - Authentication (Anonymous or Email)
   - Firestore Database
   - Storage
4. Get your Firebase config:
   - Go to Project Settings → General
   - Scroll to "Your apps" → Web app
   - Copy the config values

### Step 2: Deploy to Vercel

1. Push your code to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_value_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_value_here
```

6. Click "Deploy"
7. Wait 2-3 minutes ✨

Your app is now live!

### Step 3: Optional - Cloudinary Setup (for advanced image processing)

1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier)
2. Get your Cloud Name and Upload Preset
3. Add to Vercel environment variables:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
```

### Step 4: Optional - Weather API (for Skin Weather feature)

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api) (free tier)
2. Get API key
3. Add to Vercel environment variables:

```
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key
```

## Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your Firebase credentials

# Run development server
npm run dev

# Open http://localhost:3000
```

## Production Build

```bash
# Build
npm run build

# Test production build locally
npm start
```

## Troubleshooting

### Build Errors
- Check all environment variables are set
- Ensure Node.js version is 18+
- Clear .next folder and rebuild

### Firebase Errors
- Verify Firebase config values
- Check Firebase project has required services enabled
- Ensure Firebase rules allow read/write

### Image Upload Issues
- Check Firebase Storage rules
- Verify Storage is enabled in Firebase Console
- Check browser console for specific errors

## Post-Deployment

1. Test all features
2. Check Firebase console for activity
3. Monitor Vercel analytics
4. Set up custom domain (optional)

## Free Tier Limits

- **Vercel**: 100GB bandwidth/month
- **Firebase**: 50k reads, 20k writes/day
- **Cloudinary**: 25 credits/month
- **OpenWeather**: 1000 calls/day

These limits are sufficient for MVP testing and early users!

## Support

For issues:
1. Check GitHub Issues
2. Review Firebase/Vercel documentation
3. Contact: [your-email@example.com]

---

**Remember**: This app provides visual simulations, NOT medical advice!