import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

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
  databaseURL:
    'https://diabeticretinopathy-demo-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'diabeticretinopathy-demo',
  storageBucket: 'diabeticretinopathy-demo.appspot.com',
  messagingSenderId: '1003312391613',
  appId: '1:1003312391613:web:cbdf641cca97707d4d9ed4'
});

const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { storage, auth, database };
export default app;
