import React, { useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as FirebaseSignOut
} from 'firebase/auth';
import { auth, database } from '../firebase';
import { ref as dbRef, onValue } from 'firebase/database';
import { getData, getLabels } from 'utils/firebaseUtils';
import axios from 'axios';

const AuthContext = React.createContext({
  currentUser: null,
  userImages: null,
  severityLabels: [],
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
  const [severityLabels, setSeverityLabels] = useState([]);
  const userImagesRef = dbRef(database, `users/${currentUser?.uid}/images`);

  const getSeverityLabels = async () => {
    const res = await getLabels();
    if (res.status === 200) {
      setSeverityLabels(Object.values(res.data));
    }
  };

  useEffect(() => {
    getSeverityLabels();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let superUser = user && { ...user };
      if (user) {
        const snapshot = await getData(`users/${user.uid}`);
        if (snapshot.exists()) {
          superUser = {
            ...user,
            ...snapshot.val()
          };
        }
      }

      if (superUser) {
        superUser.getInitials = function () {
          // console.log('[name]', this.name);
          const [firstName, lastName] = this.name?.toUpperCase()?.split?.(' ');
          return `${firstName[0]}${lastName?.[0] ?? ''}`;
        };
      }
      setCurrentUser(superUser);
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
    userImages,
    severityLabels,
    loading,
    setLoading,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
