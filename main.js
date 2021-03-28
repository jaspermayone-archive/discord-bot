const Discord = require('discord.js');
const config = require("./config.json");

const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

 
const prefix = '!';
 
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
client.once('ready', () => {
    console.log('Bot is online!');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args, Discord);

    } else if (command == 'github'){
        client.commands.get('github').execute(message, args, Discord);

    } else if (command == 'admin'){
        client.commands.get('admin').execute(message, args, Discord );

    } else if (command == 'clear'){
        client.commands.get('clear').execute(message, args, Discord );

    } else if (command == 'wipe'){
        client.commands.get('wipe').execute(message, args, Discord );
    }

});
 
client.login('NzgzMDczMDk1MDM2MDQzMjc0.X8Vbpg.sI-Z-oqo9AGcIqGffz91Dfm3woM');
