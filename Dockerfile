FROM node:alpine
WORKDIR /app
COPY next.config.js .
COPY package.json .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY tsconfig.json .
 COPY yarn.lock .

# Install app dependencies
 #RUN npm install 
RUN yarn install

COPY . .
 #RUN npm run build
RUN yarn build
EXPOSE 3000
# Create a non-root user and switch to it
# RUN chown -R node /app
# USER node
# Command to run on container start
CMD ["yarn","dev"]
