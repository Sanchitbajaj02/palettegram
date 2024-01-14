# Appwrite setup

## Initial setup 🛠️

1.  Creating an account on [Appwrite Cloud](https://cloud.appwrite.io/).

2.  Create a new project with any name you want and choose **web** as a platform.

    - Name the web project anything you like and Set Hostname to `localhost`.

3.  Copy `.env.example` file to `.env.local` and `appwrite-gen/.env.example` file to `appwrite-gen/.env` manually or using:

    ```sh
    cp .env.example .env.local
    cp appwrite-gen/.env.example appwrite-gen/.env
    ```

4.  Go to settings and copy your project id and paste it in `.env.local` file as well as in `appwrite-gen/.env` files.

5.  While on the settings page click on **View API Keys** button.

6.  Create an API key with any name you like, set the scopes to all and copy it's value and paste it in `appwrite-gen/.env` file as `PROJECT_API_KEY` variable.

7.  Setup your database with the command:

    ```sh
    yarn schema:prepare
    ```

    this should create a database with users, posts, etc. collections.

8.  Fill in the rest of `.env.local` file with the appropriate ids if not already set.

## How do I make changes to the structure of the database? 🤔

1.  Make changes through the appwrite console.

2.  Generate the schema with the command:

    ```sh
    yarn schema:generate
    ```

    this should update `appwrite-gen/schema.json` with your changes.

3.  Simply push this file through the git workflow mentioned [here](git.md).

## Still got issues? 😟

Feel free to open issues if you face any. 😀
