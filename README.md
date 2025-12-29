# SkinFutures 🌟

A visual skincare motivation app that shows users how their skin may change over time based on habits and lifestyle choices.

## ⚠️ Important Disclaimer

This app provides **visual simulations**, NOT medical advice. No diagnoses, no guarantees, no fear-based messaging. All predictions are visual estimates only.

## 🎯 Core Promise

"See how your skin may change — and how small habits can improve it."

## ✨ Features

- **Visual Onboarding** - Guided selfie upload with lighting tips
- **Skin Snapshot** - Baseline analysis with trend indicators
- **Future Simulations** - See your skin's potential path (1yr, 5yr, 10yr)
- **Interactive Comparison** - Viral-ready side-by-side slider
- **Routine Builder** - Simple AM/PM skincare tracking
- **Motivation System** - Streaks and progress tracking
- **Skin Weather Alerts** - UV, pollution, and humidity insights
- **Glow Score** - Simple consistency metric
- **Monthly Reports** - Visual progress summaries

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account (free tier)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your Firebase credentials
# Get them from: https://console.firebase.google.com/

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🧪 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Image Storage**: Cloudinary (free tier)
- **Hosting**: Vercel (free)

## 📱 MVP Screens

1. Welcome / Value Proposition
2. Selfie Upload with Tips
3. Skin Snapshot (Baseline)
4. Future Simulation Viewer
5. Interactive Comparison Slider
6. Routine Builder
7. Progress & Streaks
8. Monthly Report
9. Settings & Privacy

## 🎨 Design Principles

- **Minimal & Clean** - No cluttered UI
- **Calm & Human** - Skin-friendly neutral tones
- **Fast Wow Moment** - Under 60 seconds to first simulation
- **Mobile-First** - Optimized for touch
- **No Fear Tactics** - Encouraging, not scary

## 🔐 Privacy & Safety

- Clear disclaimers throughout
- No medical diagnosis language
- No data selling
- Secure image storage
- Easy data deletion

## 📊 Success Metric

**"This makes me want to actually stick to skincare"**

If users say this, we've succeeded.

## 🛠️ Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📦 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── onboarding/  # Onboarding flow
│   ├── analysis/    # Skin analysis screens
│   └── simulation/  # Future prediction views
├── lib/             # Utilities & configs
│   ├── firebase.ts  # Firebase setup
│   ├── skinAnalysis.ts  # Rule-based analysis
│   └── imageProcessing.ts  # Image transformations
└── types/           # TypeScript definitions
```

## 🚫 MVP Limitations

**NOT building:**
- 3D avatars
- AR mirror
- Medical diagnosis
- Wearable integrations

**Focus on:**
- Emotion & motivation
- Visual payoff
- Simple, fast execution

## 🤝 Contributing

This is an MVP. Contributions welcome after initial launch!

## 📄 License

MIT License - See LICENSE file

---

Built with 💙 for skincare enthusiasts everywhere