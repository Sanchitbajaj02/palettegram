# 🤏 Pre-requisites

Before installation, please make sure you have already installed the following tools:

- [Git](https://git-scm.com/downloads)

- [NodeJs (18 or above)](https://nodejs.org/en/download/)

- [Yarn](https://yarnpkg.com/)

- [Appwrite Account](appwrite.md)

## 🛠️ Installation Steps

- [Fork](https://github.com/Sanchitbajaj02/palettegram/fork) the project. Click on the `Fork` button in the top right to get started.

- Use these commands in your git bash/terminal to make a clone of the project in your local machine.

- Clone your forked repo by replacing the URL in this command: 

```bash
git clone https://github.com/Sanchitbajaj02/palettegram.git
```

## 🏃‍♂️ Steps for running the development server

- Navigate to the project directory:

```bash
cd  palettegram
```

- Install the dependencies for the project.

**Note:** make sure to install yarn as the project will not work properly with npm or pnpm. 

```bash
yarn  install --frozen-lockfile
```

- Setup the environment variables by referring `.env.example` file.

- Start the development server using the below command:

```bash
yarn dev
```

## 🏃‍♂️ Set up using docker 

- Navigate to the project directory:

```bash
cd  palettegram
```

- Create a file `.env.local` and fill it with the environment variables.

```bash
cp .env.example .env.local
```

- Start the development server using the below command:

```bash
docker compose -f docker-compose.dev.yml up
```

- For the production server, run the following command:

```bash
docker compose -f docker-compose.yml up
# or
docker compose up
```