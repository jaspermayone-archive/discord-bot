const pjson = require('./package.json');
const { token, IDs, colors, MongoDB, emoji, Auth } = require('./config.json');
const antiLink = require('./features/anti-link');
const antiInvite = require('./features/anti-invite');
const antiSwear = require('./features/anti-swear');

const { Intents, Client } = require('discord.js');
const WOKCommands = require('wokcommands');
const path = require("path");
const io = require('@pm2/io');
const chalk = require('chalk');


io.init({
  transactions: true,
  http: true,
});



const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
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
  client.user.setActivity(`${client.guilds.cache.size} servers!`, {
    type: 'WATCHING',
  });

  console.log(
    chalk.hex('#FFF800')('Starting Heptagram || Version: ' + pjson.version),
  );
  console.log(
    chalk.hex('#FFF800')(
      `Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`,
    ),
  );

  new WOKCommands(client, {
    mongoUri: MongoDB,
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
    botOwners: [`${IDs.OwnerID}`],
    disabledDefaultCommands: [
      // 'help',
      // 'command',
      'language',
      // 'prefix',
      // 'requiredrole'
    ],
  })
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
  console.log(chalk.greenBright('Bot online and Ready!'));
});

antiSwear(client);
antiInvite(client);
antiLink(client);

client.login(token);

client.on('threadCreate', (thread) => thread.join());
client.on('threadDelete', (thread) => thread.leave());