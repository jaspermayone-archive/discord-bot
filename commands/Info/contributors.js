const https = require('https');
const Discord = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

const fetchContributors = new Promise((resolve, reject) => {
  https
    .get(
      {
        hostname: 'api.github.com',
        path: '/repos/Heptagram-Bot/Heptagram/contributors',
        headers: {
          'User-Agent': 'Heptagram-Bot/0.5.0-PRE',
          Accept: 'application/vnd.github.v3+json',
          'Cache-Control': 'no-store',
        },
      },
      (response) => {
        response.setEncoding('utf8');
        let body = '';

        response.on('data', (data) => (body += data));

        response.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });

        response.on('error', (error) => reject(error));
      },
    )
    .on('error', (error) => reject(error));
});

module.exports = {
  name: 'contributors',
  description: 'Show current contributors for Heptagram',
  category: 'Info',
  minArgs: 0,
  maxArgs: 0,
  expectedArgs: '',
  cooldown: '1m',

  callback: ({ message }) => {
    fetchContributors
      .then((contributors) => {
        let listOfContributors =
          "Here is a list of Heptagram's contributors!\n\n";

        contributors
          .filter(
            (contributor) =>
              !contributor.login.includes('[bot]') ||
              contributor.type === 'User',
          )
          .map(
            (contributor) =>
              (listOfContributors += ` *${contributor.login} - ${contributor.contributions} Contributions.*\n`),
          );

        const embed = new Discord.MessageEmbed()
          .setTitle('Heptagram Contributors')
          .setColor(colors.heptagram)
          .setDescription(
            'The Heptagram Team relies on open source contributors to keep the bot running and up to date.',
          )
          .addField('List of Contributors', listOfContributors, true)
          .setTimestamp()
          .setFooter(
            `Message sent by the Heptagram Bot || ${pjson.version}`,
            `${cdn.sqlogo}`,
          );

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        message.reply({ content: `Something went wrong: ${error}` });
        console.error(error);
      });
  },
};
