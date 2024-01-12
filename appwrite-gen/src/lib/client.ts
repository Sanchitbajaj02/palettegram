import "dotenv/config";
import { Client } from "node-appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID!)
  .setKey(process.env.PROJECT_API_KEY!);

export default client;
