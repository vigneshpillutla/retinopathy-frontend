import React, { useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as FirebaseSignOut
} from 'firebase/auth';
import { auth, database } from '../firebase';
import { ref as dbRef, onValue } from 'firebase/database';

const AuthContext = React.createContext({
  currentUser: null,
  loading: true,
  setLoading: () => {},
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {}
});

const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userImages, setUserImages] = useState(null);
  const userImagesRef = dbRef(database, `users/${currentUser?.uid}/images`);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setUserImages(null);
      return;
    }
    return onValue(userImagesRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserImages(snapshot.val());
      }
    });
  }, [currentUser]);

  const signUp = ({ name, email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    return FirebaseSignOut(auth);
  };

  const value = {
    currentUser,
    loading,
    setLoading,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
