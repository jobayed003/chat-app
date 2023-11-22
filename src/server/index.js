/* const Server = require('socket.io');

// Create a socket.io server
const ioHandler = (req, res) => {
   console.log();

   if (!res.socket.server.io) {
      console.log('*First use, starting Socket.IO');
      const io = new Server(res.socket.server);

      // Listen for connection events
      io.on('connection', (socket) => {
         console.log(`Socket ${socket.id} connected.`);

         // Listen for incoming messages and broadcast to all clients
         socket.on('message', (message) => {
            io.emit('message', message);
         });

         // Clean up the socket on disconnect
         socket.on('disconnect', () => {
            console.log(`Socket ${socket.id} disconnected.`);
         });
      });
      res.socket.server.io = io;
   }
   res.end();
};

module.exports = ioHandler;
 */

const http = require('http');
const { Server } = require('socket.io');

const httpServer = http.createServer();
const io = new Server(httpServer, {
   /* options */
});

io.on('connection', (socket) => {
   console.log('A user connected');

   socket.on('chat message', (msg) => {
      console.log('Message: ' + msg);
      io.emit('chat message', msg); // Broadcast the message to all connected clients
   });

   socket.on('disconnect', () => {
      console.log('A user disconnected');
   });
});

httpServer.listen(3001, () => {
   console.log('Socket.IO server listening on port 3001');
});
