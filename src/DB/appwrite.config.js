import { Account, Client, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.REACT_APP_PROJECT_ID);

const account = new Account(client);
const db = new Databases(client);
const storage = new Storage(client);

export { account, db, storage };
