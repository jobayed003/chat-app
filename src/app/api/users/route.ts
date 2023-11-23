import { clerkClient } from '@clerk/nextjs';
import { db } from '@firebase/config';
import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
   try {
      let data: any = [];

      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
         data.push(doc.data());
      });

      const users = await clerkClient.users.getUserList();

      return NextResponse.json(users);
   } catch (error) {
      return NextResponse.json({ message: 'Error occured' + error });
   }
};

export async function POST(req: NextRequest) {
   const data = await req.json();
   // if (!data.userId) return NextResponse.redirect('/signin');

   const userCopy = {
      ...data,
      timestamp: serverTimestamp(),
   };

   await setDoc(doc(db, 'users', data.userId), {
      ...userCopy,
   });

   const params = { firstName: 'John', lastName: 'Wick' };

   // const user = await clerkClient.users.updateUser(data.userId, params);

   return NextResponse.json({ message: 'User saved successfully!' });
}
