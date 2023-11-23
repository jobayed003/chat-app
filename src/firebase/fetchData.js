import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './config';

export const fetchData = async (collec, id) => {
   const docRef = doc(db, collec, id);
   const querySnapshot = await getDocs(collection(db, collec));

   if (id) {
      const docSnap = await getDoc(docRef);
      return docSnap.data() || 'No data found';
   } else {
      querySnapshot.forEach((doc) => {
         console.log(doc);

         return { id: doc.id, data: doc.data() } || 'No data found';
      });
   }
};
