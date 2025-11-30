// // src/lib/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// // Validate environment variables
// const requiredEnvVars = [
//   "VITE_FIREBASE_API_KEY",
//   "VITE_FIREBASE_AUTH_DOMAIN",
//   "VITE_FIREBASE_PROJECT_ID",
//   "VITE_FIREBASE_STORAGE_BUCKET",
//   "VITE_FIREBASE_MESSAGING_SENDER_ID",
//   "VITE_FIREBASE_APP_ID",
//   "VITE_FIREBASE_MEASUREMENT_ID",
// ];

// requiredEnvVars.forEach((varName) => {
//   if (!import.meta.env[varName]) {
//     console.error(`Environment variable ${varName} is missing in .env file`);
//   }
// });

// // Firebase configuration using environment variables
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize services
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();
// export const analytics = getAnalytics(app);
