import { auth, clerkClient, currentUser } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
   try {
      // let data: any = [];

      // const querySnapshot = await getDocs(collection(db, 'users'));
      // querySnapshot.forEach((doc) => {
      //    data.push(doc.data());
      // });

      const users = await clerkClient.users.getUserList();

      return NextResponse.json(users);
   } catch (error) {
      return NextResponse.json({ message: 'Error occured' + error });
   }
};

export async function POST(req: NextRequest) {
   const user = await currentUser();
   const { sessionId, userId } = auth();
   let newUser;
   // const newUser = await prisma.user.create({
   //    data: {
   //       userId: userId!,
   //       email: user?.emailAddresses[0].emailAddress!,
   //       session: sessionId!,
   //       username: user?.username!,
   //       imageUrl: user?.imageUrl!,
   //    },
   // });

   // const user = await clerkClient.users.updateUser(data.userId, params);
   return NextResponse.json({ message: 'User saved successfully!', user: newUser });
}
