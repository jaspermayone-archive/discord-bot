const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
  name: 'clyde',
  description: 'Get a custom clyde message!',
  execute: async(Discord, client, message, args) => {
    if (!args[0]) {
    return message.channel.send(`Usage: ${prefix}clyde <msg>`)
    }
    let clydeMessage = args.slice(0).join(' ');

    message.channel.send({files : [{attachment: `https://ctk-api.herokuapp.com/clyde/${clydeMessage}`, name: 'file.jpg'}]});
  }
}
