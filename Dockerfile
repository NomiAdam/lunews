# This is mandatory, we choose which version of node we want, alpine is lightweight
FROM node:11.9.0

# For security reasons make app folder with given user privileges, in this case 'node'
# No other folder should have these privileges, never use root command
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set as working directory
WORKDIR /home/node/app

# Copy package.json to install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Copy yarn.lock
COPY yarn.lock ./

# Set current user to node
USER node

# Copy all src files, everything that is not described on .dockerignore
COPY --chown=node:node . .

# Install all server dependencies
RUN npm install

# Run server build
RUN npm run build:server

# Run docker setup
RUN npm run create:database

# Install all client dependencies and build
RUN cd ./client && npm install && npm run build

# Expose port 3333, should be bound to the same port as app
EXPOSE 3333

# Start our application
CMD [ "npm", "start" ]
