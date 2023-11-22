//@ts-ignore

import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import type { NextApiResponse } from 'next';
import type { Server as IOServer } from 'socket.io';
import { Server } from 'socket.io';

export const config = {
   api: {
      bodyParser: false,
   },
};

interface SocketServer extends HTTPServer {
   io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
   server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
   socket: SocketWithIO;
}
/* export default function socketHandler(_req: NextApiRequest, res: NextApiResponseWithSocket) {
   if (res.socket.server.io) {
      res.status(200).json({ success: true, message: 'Socket is already running', socket: `:${PORT + 1}` });
      return;
   }

   console.log('Starting Socket.IO server on port:', PORT);

   const io = new Server({
      path: '/api/socket',
      addTrailingSlash: false,
      cors: { origin: '*' },
      transports: ['websocket'],
   }).listen(PORT + 1);

   io.on('connect', (socket) => {
      const _socket = socket;
      //   console.log(socket);

      console.log('socket connect', socket.id);

      socket.on('message', (message) => {
         console.log(message);
         io.emit('receive', message);
      });

      _socket.broadcast.emit('welcome', `Welcome ${_socket.id}`);
      socket.on('disconnect', async () => {
         console.log('socket disconnect');
      });
   });

   res.socket.server.io = io;
   res.status(201).json({ success: true, message: 'Socket is started', socket: `:${PORT + 1}` });
} */
export default function SocketHandler(req, res: NextApiResponseWithSocket) {
   if (res.socket.server.io) {
      console.log('Already set up');
      res.end();
      return;
   }

   const io = new Server(res.socket.server);
   res.socket.server.io = io;

   io.on('connection', (socket) => {
      socket.on('send', (obj) => {
         console.log(obj);
         io.emit('receive', obj);
      });
   });

   console.log('Setting up socket');
   res.end();
}
