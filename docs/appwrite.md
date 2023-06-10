
# Appwrite setup

  

## Initial setup

 1. Creating an account on [Appwrite Cloud](https://cloud.appwrite.io/).
 2. Installing Appwrite CLI by writing the following command in your terminal:

    npm install -g appwrite-cli

For installing with scripts you can follow the [docs](https://appwrite.io/docs/command-line).

 1. Login to Appwrite CLI by using the following command:
 

    appwrite login

 2. Enter you Appwrite Cloud Id Password to login.
 3. Now go to Palettegram folder by changing directory and run the following command:
 

    appwrite deploy collection

 4. Select both the schema's one by one.
 5. Go to Appwrite Cloud and copy Your Project Id, Database Id, Collection's Id, Storage ID and Function's ID and paste it in the `.env` file.
