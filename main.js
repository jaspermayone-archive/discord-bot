const pjson = require('./package.json');
const { token, IDs, colors, MongoDB, emoji } = require('./config.json');
const { intents, partials } = require("./config.js");
const logger = require("./util/logger.js");
// const antiLink = require('./features/anti-link');
// const antiInvite = require('./features/anti-invite');
// const antiSwear = require('./features/anti-swear');

const { Client } = require('discord.js');
const heptahandler = require('heptagram-handler');
const path = require("path");
const io = require('@pm2/io');

io.init({
  transactions: true,
  http: true,
})

const client = new Client({ intents, partials });


client.on('ready', async () => {
  client.user.setStatus('online');
  client.user.setActivity(`${client.guilds.cache.size} servers!`, {
    type: 'WATCHING',
  });

   logger.heptagram('Starting Heptagram || Version: ' + pjson.version)

   logger.heptagram(`Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

   new heptahandler(client, {
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
  logger.ready('Bot online and Ready!');
});

/* Disabled till configurablw
antiSwear(client);
antiInvite(client);
antiLink(client);
*/

client.login(token);

client.on('threadCreate', (thread) => thread.join());
client.on('threadDelete', (thread) => thread.leave());