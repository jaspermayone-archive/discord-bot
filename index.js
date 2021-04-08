const config = require('dotenv').config();
const { prefix, token, roles, MongoDB } = require('./config.json');

const { ShardingManager } = require('discord.js');
const mongoose = require('mongoose');

const manager = new ShardingManager('./bot.js', {
	execArgv: ['--trace-warnings'],
	shardArgs: ['--ansi', '--color'],
	token: (token),
})

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});