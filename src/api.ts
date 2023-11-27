//Auth token we will use to generate a meeting and connect to it
export const authToken: string =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJhN2ZiMDE1My1lNmJhLTRlYjktODZlYy0xZGU4ZDJlOTYzZDUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMTA2NTYwNywiZXhwIjoxNzE2NjE3NjA3fQ.kpXBYY3D8oX3rODtoN54tL9pac3_6wxB1mxVkMasj7g';

// API call to create meeting
export const createMeeting = async ({ token }: { token: string }) => {
   const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: 'POST',
      headers: {
         authorization: `${authToken}`,
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
   });
   //Destructuring the roomId from the response
   const { roomId }: { roomId: string } = await res.json();
   return roomId;
};
