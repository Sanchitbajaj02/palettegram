import "dotenv/config";
import { Client, Databases, Storage } from "node-appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID!)
  .setKey(process.env.PROJECT_API_KEY!);

const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage };
