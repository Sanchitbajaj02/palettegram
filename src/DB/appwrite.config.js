import { Account, Client, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.REACT_APP_PROJECT_ID);

const account = new Account(client);
const signup = async (email, password, username, phoneNumber) => {
  try {
    const user = await account.create(
      ID.unique(),
      email,
      password,
      phoneNumber,
      username,
    );
    if(user){
      login({email: email, password:password});
    }else{
      return user;
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (email, password) => {
  try {
    return await account.createEmailSession(
      email,
      password,
    );
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = async () => {
  try {
    return await account.getCurrentUser();
  } catch (error) {
    console.log(error);
  }
};
export { signup, login, getCurrentUser};
