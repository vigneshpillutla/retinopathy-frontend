import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const app = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// });

const app = initializeApp({
  apiKey: 'AIzaSyAhjLRkSuGktyo6UqYU7iWVcpt5JAx1cCA',
  authDomain: 'diabeticretinopathy-demo.firebaseapp.com',
  projectId: 'diabeticretinopathy-demo',
  storageBucket: 'diabeticretinopathy-demo.appspot.com',
  messagingSenderId: '1003312391613',
  appId: '1:1003312391613:web:cbdf641cca97707d4d9ed4'
});

export const auth = getAuth(app);
export default app;
