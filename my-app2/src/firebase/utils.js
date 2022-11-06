import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters( { prompt: 'select_account'} );

                         //userAuth has email and id data for logged in user
export const handleUserProfile = async (userAuth,  additionalData) => {
    if (!userAuth) return; //check if user is valid. 
     const { uid } = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();

        // if user does not exist
    if (!snapshot.exists) {

        const { displayName, email } = userAuth;
        const timestamp = new Date();

        try {
            // new document in user's collection stores user information
            await userRef.set ( {
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    return userRef; //store user info in local state of app, to sign them in
};