# 🌀 FlowSeq

**FlowSeq** is a productivity-focused web app that helps you stay in flow by using customizable time sequences consisting of focus sessions, short breaks, and long breaks – inspired by the Pomodoro technique but far more flexible.

---

## ✨ Features

- 🕒 **Customizable flow sequences** with steps like focus time, short break, and long break
- 🔔 **Custom notification sounds** for each step
- 🎨 **Visual themes** with adjustable accent colors and background images
- 💾 **Save and reuse your own sequences**
- 📊 **Track completed sequences**
- 🔇 **Focus mode** to reduce distractions
- 📦 **Installable as a Progressive Web App (PWA)**
- 🌐 Uses a **Firebase backend** for user data and synchronization

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (recommended: version ≥ 18)
- [Angular CLI](https://angular.io/cli) (recommended: version ≥ 16)
- A Firebase project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/flowseq.git
   cd flowseq


   ```

2. Install dependencies:
   ```bash
   npm install

   ```
3. Create the environment file
   Create a new file at: src/environments/environment.ts

   Then paste the following content inside it, and replace the placeholder values with your actual Firebase credentials:

   ```ts
   export const environment = {
     production: false,
     googleClientId: "YOUR_GOOGLE_CLIENT_ID",
     firebase: {
       apiKey: "YOUR_API_KEY",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID",
     },
   };
   ```

4. Start the development server:

   ```bash
   ng serve

   ```

5. Open the app in your browser: http://localhost:4200

## 🔥 Firebase Setup

1. Create a new project at [https://firebase.google.com](https://firebase.google.com)

2. Enable **Authentication**  
   Go to **Build > Authentication > Get started**  
   Enable a sign-in method, e.g., **Google Sign-In**

3. Enable **Firestore Database**  
   Go to **Build > Firestore Database > Create database**  
   Choose **Start in test mode** (for development) and select a region

4. (Optional) Set up **Firebase Hosting** for deployment  
   Go to **Build > Hosting > Get started**  
   Follow the Firebase CLI instructions for deployment
