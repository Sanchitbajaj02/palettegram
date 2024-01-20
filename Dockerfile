FROM node:18 as builder

WORKDIR /app

# Update npm
RUN npm install -g npm@latest

# Install app dependencies
COPY ["package.json", "yarn.lock*", "./"]
RUN yarn install

#  Copy source code
COPY . .

EXPOSE 3000

# Create a non-root user and switch to it
# RUN chown -R node /app
# USER node

# Command to run on container start
CMD ["yarn", "dev"]
