import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
   try {
      const user = {};
      return NextResponse.json({ user });
   } catch (error) {
      return NextResponse.json({ message: 'Error occured' + error });
   }
};
