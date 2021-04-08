const config = require('dotenv').config();
const { prefix, token, roles, MongoDB } = require('./config.json');

const { ShardingManager } = require('discord.js');
const mongoose = require('mongoose');

const manager = new ShardingManager('./bot.js', {
	execArgv: ['--trace-warnings'],
	shardArgs: ['--ansi', '--color'],
	totalShards: 'auto',
	token: (token),
})

manager.spawn();
manager.on('launch', shard => console.log("Sharding Manager ➜".bold.brightYellow, `Launched shard ${shard.id}`.bold.brightCyan));

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});