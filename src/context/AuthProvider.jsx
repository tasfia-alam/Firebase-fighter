import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUserWithEmailAndPasswordFunc = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);

    };

    const updateProfileFunc = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL,
    });
  };

      const sendEmailVerificationFunc = () => {
        return sendEmailVerification(auth.currentUser);

  };




    const signInWithEmailAndPasswordFunc = (email, password) => 
        {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithEmailFunc = () => 
        {
        return signInWithPopup(auth, googleProvider);
    }

    const signInWithGithubFunc = () =>{
       
        return signInWithPopup(auth, githubProvider);
    }

    const signOutUserFunc = () => {
         setLoading(true);
        return signOut(auth);
    }

    const sendPasswordResetEmailFunc = (email) => {
         setLoading(true);
        return sendPasswordResetEmail(auth, email)
    }


    const authInfo = {
        user,
        setUser,
        createUserWithEmailAndPasswordFunc,
        signInWithEmailAndPasswordFunc,
        signInWithEmailFunc,
        signInWithGithubFunc,
        signOutUserFunc,
        sendPasswordResetEmailFunc,
        updateProfileFunc,
        sendEmailVerificationFunc,
        loading,
        setLoading,
        

    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) =>{
            console.log(currUser);
            setUser(currUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    // onAuthStateChanged(auth, (currUser) => {
    //     console.log(currUser);
    //     setUser(currUser);
    //     setLoading(false);
        
    // });



    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;