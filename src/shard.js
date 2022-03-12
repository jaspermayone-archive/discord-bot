require("dotenv").config();

const { ShardingManager } = require('discord.js')

// import logger from utils/logger.js
const logger = require("./utils/logger.js");

const manager = new ShardingManager('./index.js', {
  token: process.env.DISCORD_TOKEN,
  totalShards: parseInt(process.env.SHARD_COUNT) || 'auto'
})

manager.spawn()
manager.on('shardCreate', shard => {
    logger.shard(`Launching shard ${shard.id}`);
})