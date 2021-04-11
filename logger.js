// Link to documentation: https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate

const events = {
	channelCreate: async (client) => {
		client.on("channelCreate", function (channel) {
			console.log(`channelCreate: ${channel}`);
		});
	},

	channelDelete: async (client) => {
		client.on("channelDelete", function (channel) {
			console.log(`channelDelete: ${channel}`);
		});
	},

	channelPinsUpdate: async (client) => {
		client.on("channelPinsUpdate", function (channel, time) {
			console.log(`channelPinsUpdate: ${channel}:${time}`);
		});
	},

	channelUpdate: async (client) => {
		client.on("channelUpdate", function (oldChannel, newChannel) {
			console.log(
				`channelUpdate -> a channel is updated - e.g. name change, topic change`
			);
		});
	},

	clientUserGuildSettingsUpdate: async (client) => {
		client.on(
			"clientUserGuildSettingsUpdate",
			function (clientUserGuildSettings) {
				console.log(
					`clientUserGuildSettingsUpdate -> client user's settings update`
				);
			}
		);
	},

	clientUserSettingsUpdate: async (client) => {
		client.on("clientUserSettingsUpdate", function (clientUserSettings) {
			console.log(
				`clientUserSettingsUpdate -> client user's settings update`
			);
		});
	},

	debug: async (client) => {
		client.on("debug", function (info) {
			console.log(`debug -> ${info}`);
		});
	},

	disconnect: async (client) => {
		client.on("disconnect", function (event) {
			console.log(`The WebSocket has closed and will no longer attempt to reconnect`);
		});
	},

	emojiCreate: async (client) => {
		client.on("emojiCreate", function (emoji) {
			console.log(`a custom emoji is created in a guild`);
		});
	},

	emojiDelete: async (client) => {
		client.on("emojiDelete", function (emoji) {
			console.log(`a custom guild emoji is deleted`);
		});
	},

	emojiUpdate: async (client) => {
		client.on("emojiUpdate", function (oldEmoji, newEmoji) {
			console.log(`a custom guild emoji is updated`);
		});
	},

	error: async (client) => {
		client.on("error", function (error) {
			console.error(`client's WebSocket encountered a connection error: ${error}`);
		});
	},

	guildBanAdd: async (client) => {
		client.on("guildBanAdd", function (guild, user) {
			console.log(`a member is banned from a guild`);
		});
	},

	guildBanRemove: async (client) => {
		client.on("guildBanRemove", function (guild, user) {
			console.log(`a member is unbanned from a guild`);
		});
	},

	guildCreate: async (client) => {
		client.on("guildCreate", function (guild) {
			console.log(`the client joins a guild`);
		});
	},

	guildDelete: async (client) => {
		client.on("guildDelete", function (guild) {
			console.log(`the client deleted/left a guild`);
		});
	},

	guildMemberAdd: async (client) => {
		client.on("guildMemberAdd", function (member) {
			console.log(`a user joins a guild: ${member.tag}`);
		});
	},

	guildMemberAvailable: async (client) => {
		client.on("guildMemberAvailable", function (member) {
			console.log(`member becomes available in a large guild: ${member.tag}`);
		});
	},

	guildMemberRemove: async (client) => {
		client.on("guildMemberRemove", function (member) {
			console.log(`a member leaves a guild, or is kicked: ${member.tag}`);
		});
	},

	guildMembersChunk: async (client) => {
		client.on("guildMembersChunk", function (members, guild) {
			console.error(`a chunk of guild members is received`);
		});
	},

	guildMemberSpeaking: async (client) => {
		client.on("guildMemberSpeaking", function (member, speaking) {
			console.log(`a guild member starts/stops speaking: ${member.tag}`);
		});
	},

	guildMemberUpdate: async (client) => {
		client.on("guildMemberUpdate", function (oldMember, newMember) {
			console.error(`a guild member changes - i.e. new role, removed role, nickname.`);
		});
	},

	guildUnavailable: async (client) => {
		client.on("guildUnavailable", function (guild) {
			console.error(`a guild becomes unavailable, likely due to a server outage: ${guild}`);
		});
	},

	guildUpdate: async (client) => {
		client.on("guildUpdate", function (oldGuild, newGuild) {
			console.error(`a guild is updated`);
		});
	},

	message: async (client) => {
		client.on("message", async function (message) {
			console.log(`message is created -> ${message}, by ${client.user.id}`);
			// const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE'}).then(audit => audit.entries.first());
			// console.log(entry)
		});
	},
	messageDelete: async (client) => {
		client.on("messageDelete", async (message) => {
			try {
				const logs = message.guild.channels.cache.find(
					(channel) => channel.name === "logs"
				);
				if (
					message.guild.me.hasPermission("MANAGE_CHANNELS") &&
					!logs
				) {
					message.guild.channels.create("logs", { type: "text" });
				}
				if (
					!message.guild.me.hasPermission("MANAGE_CHANNELS") &&
					!logs
				) {
					console.log(
						"The logs channel does not exist and tried to create the channel but I am lacking permissions"
					);
				}
				const entry = await message.guild
					.fetchAuditLogs({ type: "MESSAGE_DELETE" })
					.then((audit) => audit.entries.first());
				let user = "";
				if (
					entry.extra.channel.id === message.channel.id &&
					entry.target.id === message.author.id &&
					entry.createdTimestamp > Date.now() - 5000 &&
					entry.extra.count >= 1
				) {
					user = entry.executor.username;
				} else {
					user = message.author.username;
				}
				logs.send(
					`A message was deleted in ${message.channel.name} by ${user}`
				);
			} catch (error) {
				console.error(error);
			}
		});
	},

	messageDeleteBulk: async (client) => {
		client.on("messageDeleteBulk", function (messages) {
			console.log(`messages are deleted -> ${messages}`);
		});
	},

	messageReactionAdd: async (client) => {
		client.on("messageReactionAdd", function (messageReaction, user) {
			console.log(`a reaction is added to a message`);
		});
	},

	messageReactionRemove: async (client) => {
		client.on("messageReactionRemove", function (messageReaction, user) {
			console.log(`a reaction is removed from a message`);
		});
	},

	messageReactionRemoveAll: async (client) => {
		client.on("messageReactionRemoveAll", function (message) {
			console.error(`all reactions are removed from a message`);
		});
	},

	messageUpdate: async (client) => {
		client.on("messageUpdate", function (oldMessage, newMessage) {
			console.log(`a message is updated`);
		});
	},

	presenceUpdate: async (client) => {
		client.on("presenceUpdate", function (oldMember, newMember) {
			console.log(`a guild member's presence changes`);
		});
	},

	ready: async (client) => {
		client.on("ready", function () {
			console.log(`the client becomes ready to start`);
			console.log(`I am ready! Logged in as ${client.user.tag}!`);
			console.log(
				`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
			);

			client.user.setActivity("the upright organ");
			client
				.generateInvite([
					"SEND_MESSAGES",
					"MANAGE_GUILD",
					"MENTION_EVERYONE",
				])
				.then((link) => {
					console.log(`Generated bot invite link: ${link}`);
					inviteLink = link;
				});
		});
	},

	reconnecting: async (client) => {
		client.on("reconnecting", function () {
			console.log(`client tries to reconnect to the WebSocket`);
		});
	},

	resume: async (client) => {
		client.on("resume", function (replayed) {
			console.log(`whenever a WebSocket resumes, ${replayed} replays`);
		});
	},

	roleCreate: async (client) => {
		client.on("roleCreate", function (role) {
			console.error(`a role is created`);
		});
	},

	roleDelete: async (client) => {
		client.on("roleDelete", function (role) {
			console.error(`a guild role is deleted`);
		});
	},

	roleUpdate: async (client) => {
		client.on("roleUpdate", function (oldRole, newRole) {
			console.error(`a guild role is updated`);
		});
	},

	typingStart: async (client) => {
		client.on("typingStart", function (channel, user) {
			console.log(`${user.tag} has started typing`);
		});
	},

	typingStop: async (client) => {
		client.on("typingStop", function (channel, user) {
			console.log(`${user.tag} has stopped typing`);
		});
	},

	userNoteUpdate: async (client) => {
		client.on("userNoteUpdate", function (user, oldNote, newNote) {
			console.log(`a member's note is updated`);
		});
	},

	userUpdate: async (client) => {
		client.on("userUpdate", function (oldUser, newUser) {
			console.log(`user's details (e.g. username) are changed`);
		});
	},

	voiceStateUpdate: async (client) => {
		client.on("voiceStateUpdate", function (oldMember, newMember) {
			console.log(`a user changes voice state`);
		});
	},

	warn: async (client) => {
		client.on("warn", function (info) {
			console.log(`warn: ${info}`);
		});
	}
};

// This object should contains the events to be listened to - CHECK FOR TYPOS!
const listeningEvents = [
	'ready',
	'message',
	'typingStart',
]

// use this property in main.js for listening to selected events
const selectedEvents = (client) => {
	for (const [key, value] of Object.entries(events)) {
		// if (Object.keys(listeningEvents).includes(key)) {
		if (listeningEvents.includes(key)) {
			console.log('line 304', key);
			value(client);
		}
	}
} 

const all = (client) => {
	for (const [key, value] of Object.entries(events)) {
		value(client);
	}
}

module.exports = {
	...events,
	selectedEvents,
	all
};
