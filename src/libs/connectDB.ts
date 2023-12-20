import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.DATABASE_URL as string;

const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   },
});

export async function connectDB() {
   // Connect the client to the server	(optional starting in v4.7)
   const connect = await client.connect();

   if (connect) {
      return client.db('chatDB');
   }
}

export async function disconnectDB() {
   return client.close();
}
