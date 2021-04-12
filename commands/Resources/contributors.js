const https = require('https');

const fetchContributors = new Promise((resolve, reject) => {
  https.get({
    hostname: 'api.github.com',
    path: '/repos/Heptagram-Bot/Heptagram/contributors',
    headers: { 'User-Agent': 'Heptagram-Bot/1.0' }
  }, response => {
    response.setEncoding("utf8");
    let body = "";

    response.on("data", data => body += data);

    response.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    response.on('error', error => reject(error));
  }).on('error', error => reject(error));
});

module.exports = {
  name: 'contributors',
  guildOnly: false,
  description: "Show current contributors for Heptagram",
  execute({ message }) {
    fetchContributors.then(contributors => {
      let listOfContributors = `Heptagram\'s contributors are awesome, here is a list of them!\n\n`;
        
        contributors
          .filter(contributor => ! contributor.login.includes('[bot]') || contributor.type === 'User')
          .map(contributor => listOfContributors += `+ ${contributor.login} - ${contributor.contributions} Contributions.\n`);
        
        message.channel.send(listOfContributors);
    }).catch(error => {
      message.channel.send(`Something went wrong: ${error}`);
      console.error(error);
    });
  }
}