import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
   try {
      const user = {};
      return NextResponse.json({ user });
   } catch (error) {
      return NextResponse.json({ message: 'Error occured' + error });
   }
};
