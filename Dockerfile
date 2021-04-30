FROM node:14.16.0-alpine

ENV NODE_ENV production

# Create app directory
WORKDIR /bot

# Install app dependencies
COPY .npmrc ./
COPY package*.json ./
COPY npm-shrinkwrap.json ./

RUN npm ci

# Bundle app source
COPY . .

EXPOSE 3001

CMD ["node", "main.js"]