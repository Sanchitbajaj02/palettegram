import { Account, Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.REACT_APP_PROJECT_ID);

// const permissions = [
//   Permission.read(Role.user(user['$id'])),
//   Permission.write(Role.user(user['$id'])),
// ]


// const resp = await db.createDocument(
//   palettegramDB,
//   usersCollection,
//   ID.unique(),
//   {
//     email: userData.email,
//     fullName: userData.fullName,
//     username: userData.username,
//   }
// );
// const db = new Databases(client);

const account = new Account(client);
const db = new Databases(client);

export { account, db };
