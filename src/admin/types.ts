import * as mongoDB from "mongodb";
export const collections: { users?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "host url should be given here",
    	{
	  tlsCAFile: `rds-combined-ca-bundle.pem`, //Specify the DocDB; cert
	}
  );
  await client.connect();
  const db: mongoDB.Db = client.db("mention your db name here");

  const users: mongoDB.Collection = db.collection("mention your collection name here");

  collections.users = users;

  //  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${devices.collectionName}`);
}
