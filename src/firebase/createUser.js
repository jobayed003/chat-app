import { signInWithPopup } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

export const createUser = async (provider) => {
   try {
      signInWithPopup(auth, provider).then((result) => {
         const { user } = result;
         setDoc(doc(db, 'users', user.uid), {
            name: user.displayName,
            email: user.email,
            profilePic: user.photoURL,
            timestamp: serverTimestamp(),
         });
      });
      return true;
   } catch (error) {
      return false;
   }
};
