const pjson = require('./package.json');
const { token, IDs, colors, MongoDB, emoji, sentrydsn } = require('./config.json');

const chalk = require('chalk');
// const Spinnies = require('spinnies');
// const spinnies = new Spinnies();

const Sentry = require("@sentry/node");
// const Tracing = require("@sentry/tracing");


const http = require("http");

//------------------------------------------------------
//console.log(chalk.cyanBright(`[SENTRY] Starting Sentry`));


//Sentry.init({
//	dsn: `${sentrydsn}`,
//	environment: "production",
//	release: "Heptagram@" + pjson.version,
//	integrations: [
//		new Sentry.Integrations.Http({ tracing: true }),
//	  ],
//	tracesSampleRate: 1.0,
//});

//const transaction = Sentry.startTransaction({
//	op: "transaction",
//	name: "Init Transaction",
//});

//// Note that we set the transaction as the span on the scope.
//// This step makes sure that if an error happens during the lifetime of the transaction
//// the transaction context will be attached to the error event
//Sentry.configureScope(scope => {
//	scope.setSpan(transaction);
//});

//let request;

//try {
//	// this should generate an http span
//	// eslint-disable-next-line no-unused-vars
//	request = http.get("http://sentry.io", res => {
//	/*
//		// This can be un commented to see the span in the console
//	console.log(chalk.cyanBright(`[SENTRY] STATUS: ${res.statusCode}`));
//	console.log(chalk.cyanBright(`[SENTRY] HEADERS: ${JSON.stringify(res.headers)}`));
//	*/
//	});

//	console.log(chalk.cyanBright(`[SENTRY] Sentry is testing the connection`));
//}
//catch (err) {
//	Sentry.captureException(err);
//}

//request.on("close", () => {
//	transaction.finish();
//	console.log(chalk.cyanBright(`[SENTRY] Sentry is up and running`));
//});

//----------------------------------------------------------------

const { Intents, Client } = require('discord.js');

const path = require('path');

const WOKCommands = require('wokcommands');


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
	console.log(chalk.hex('#FFF800')(`Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`));

	const dbOptions = {
		keepAlive: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	  };

	const wok = new WOKCommands(client, {
		dbOptions, mongoUri: MongoDB,
		commandsDir: path.join(__dirname, 'commands'),
		featuresDir: path.join(__dirname, 'features'),
		messagesPath: '',
		typeScript: false,
		showWarns: true,
		delErrMsgCooldown: -1,
		defaultLangauge: 'english',
		ignoreBots: true,
		ephemeral: false,
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
				name: 'Utilities',
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


	wok.on('databaseConnected', (connection, state) => {
		console.log(chalk.hex('#b8e014')(`The database connection state is now "${state}"`));
		  });

		  wok.on('commandException', (command, message, error) => {
		message.channel.send(`An error occured while executing the command \`${command.name}\`: \`${error.message}\``);
		console.log(chalk.hex('#ed0c22')`An exception occured when using command "${command.names[0]}"! The error is:`);
		console.error(error);
		  });


	console.log(chalk.greenBright('Bot online and Ready!'));

});

antiInvite(client);
antiLink(client);


client.login(token);

client.on("threadCreate", (thread) => thread.join());
client.on("threadDelete", (thread) => thread.leave());
