import { auth } from '@clerk/nextjs';
import { connectDB } from '@libs/connectDB';
import { Db } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
   try {
      const { userId } = auth();

      const db = (await connectDB()) as Db;
      const Users = db?.collection('Users').find();

      let users = [];
      for await (const doc of Users) {
         users.push(doc);
      }

      return NextResponse.json(users.filter((el: any) => el.id !== userId));
   } catch (error) {
      return NextResponse.json({ message: 'Error occured' + error });
   }
};
