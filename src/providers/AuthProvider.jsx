import React, { useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as FirebaseSignOut
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = React.createContext({
  currentUser: null,
  loading: true,
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
