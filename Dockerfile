FROM node:latest

# Create the directory!
RUN mkdir -p /usr/src/heptagram-bot
WORKDIR /usr/src/heptagram-bot

# Copy and Install our bot
COPY package.json /usr/src/heptagram-bot
RUN npm install

# Our bot
COPY . /usr/src/heptagram-bot

# Start me!
CMD ["node", "main.js"]
