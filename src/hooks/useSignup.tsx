import { Auth, createUserWithEmailAndPassword } from 'firebase/auth';

const useSignup = async (auth: Auth, credentials: { name: string; password: string; email: string }) => {
   const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
   const user = userCredential.user;

   console.log(user);

   // updateProfile(auth?.currentUser, {
   //    displayName: credentials.name,
   // });

   // const userCopy = {
   //    ...credentials,
   //    role: 'user',
   //    timeStamp: serverTimestamp(),
   // };

   // await addDoc(doc(db, 'users', user.uid), userCopy);
};

export default useSignup;
