const chalk = require('chalk');


const Sentry = require("@sentry/node");
// const Tracing = require("@sentry/tracing");

const http = require("http");

console.log(chalk.cyanBright(`[SENTRY] Starting Sentry`));


Sentry.init({
	dsn: "https://6db956a768384c90a1ac352cd1f78a3e@o948173.ingest.sentry.io/5954610",
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
	  ],
	tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
	op: "transaction",
	name: "My Transaction",
});

// Note that we set the transaction as the span on the scope.
// This step makes sure that if an error happens during the lifetime of the transaction
// the transaction context will be attached to the error event
Sentry.configureScope(scope => {
	scope.setSpan(transaction);
});

let request;

try {
	// this should generate an http span
	request = http.get("http://sentry.io", res => {
		console.log(chalk.cyanBright(`[SENTRY] STATUS: ${res.statusCode}`));
		console.log(chalk.cyanBright(`[SENTRY] HEADERS: ${JSON.stringify(res.headers)}`));
	});

	// this error event should have trace context
	// eslint-disable-next-line no-undef
	console.log();
}
catch (err) {
	Sentry.captureException(err);
}

request.on("close", () => {
	transaction.finish();
});

const { Intents, Client } = require('discord.js');

const path = require('path');

const WOKCommands = require('wokcommands');

const { token, IDs, colors, MongoDB, emoji } = require('./config.json');
const pjson = require('./package.json');

const antiLink = require('./features/anti-link');
const antiInvite = require('./features/anti-invite');

const client = new Client({
	partials: [
		'MESSAGE',
		'CHANNEL',
		'REACTION',
	],
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_INVITES,
		 Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	],
});

client.on('ready', async () => {

	client.user.setStatus('online');
	client.user.setActivity(`${client.guilds.cache.size} servers!`, { type: 'WATCHING' });

	console.log(chalk.hex('#FFF800')('Starting Heptagram || Version: ' + pjson.version));
	console.log(chalk.green(`Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`));


	new WOKCommands(client, {
		commandsDir: path.join(__dirname, 'commands'),
		featuresDir: path.join(__dirname, 'features'),
		messagesPath: '',
		showWarns: true,
		delErrMsgCooldown: -1,
		defaultLangauge: 'english',
		ignoreBots: true,
		dbOptions: {
			keepAlive: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		},
		testServers: ['826493837878493204'],
		disabledDefaultCommands: [
			// 'help',
			// 'command',
			'language',
			// 'prefix',
			// 'requiredrole'
		],
	})
	    .setBotOwner(IDs.OwnerID)
		.setDefaultPrefix('!')
		.setColor(colors.heptagram)
		.setMongoPath(MongoDB)
		.setCategorySettings([
			{
				name: 'Examples',
				emoji: '🚧',
				hidden: true,
			},
			{
				name: 'Development',
				emoji: '⭕️',
				hidden: true,
			},
			{
				name: 'Fun',
				emoji: '🎮',
			},
			{
				name: 'Moderation',
				emoji: '🔨',
			},
			{
				name: 'Owner',
				emoji: `${emoji.HeptaHeart}`,
				customEmoji: true,
				hidden: true,
			},
			{
				name: 'Resources',
				emoji: '📂',
			},
			{
				name: 'Utilitys',
				emoji: '🦾',
			},
			{
				name: 'Info',
				emoji: '📒',
			},
			{
				name: 'Thanks',
				emoji: '🤝',
			},
		]);


	console.log(chalk.blueBright('Bot online and Ready!'));

});
client.on("threadCreate", (thread) => thread.join());


antiInvite(client);
antiLink(client);

// client.config = config;
// client.version = pjson.version;

client.login(token);