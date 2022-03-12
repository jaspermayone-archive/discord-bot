/**
 * Autopublish command, where the bot publish automatically a message in a news channel.
 * The channel must be setup when the bot arrives on the server, and the bot need to be able to manage messages.
 */

const config = require("./config");
const { getSettings }= require("./utils/functions");


exports.run = async (client, message, args, level) =>{
    const settings = message.settings = getSettings(message.guild);
    const autoPublishChannel = settings["autoPublishChannel"];


    //Check if the you have persmission to manage messages and send messages
    if(checkPermission(message,)) return reaction(message, config.autoPublishEmojis.ROTATING_LIGHT);

    //Check if there is an argument to the command
    if(!args) return message.channel.send(`:x: You must precise the link or id of the message you want to publish. *Example : \`${settings.prefix}publish [link-to-your-message]*`);

    //Get the message from the link or ID provided
    const [msg, channel] = await getMessage(message, args[0]);

    //Check if the message exist
    if (!msg){
        return message.channel.send(":x: That message doesn't exist. Check if your message ID is right or try using message links instead.");
    }

    //Check if the message is sent in an announcement channel
    if (channel.type !== 'news'){
        return message.channel.send(":x: The message was not sent in an announcement channel.");
    }

    //Check if the bot has the permission to send messages
    if  (
        !msg.guild.me.permissionsIn(channel).has('MANAGE_MESSAGES') ||
        !msg.guild.me.permissionsIn(channel).has('SEND_MESSAGES')
    ){
        return await message.channel.send(":x: I do not have the permissions required to publish messages. Please make sure I can both `MANAGE_MESSAGES` and `SEND_MESSAGES`.")
            .then(msg => msg.delete({ timeout: 5000 }));
    }

    //Check if the user has permission to send messages IN THE CHANNEL
    if (msg.author.id !== message.author.id && !message.member.permissionsIn(channel).has('MANAGE_MESSAGES')){
        return await message.channel.send(":x: You do not have the permission to use this command. Check if you have `MANAGE_MESSAGES` to send another user\'s message or `SEND_MESSAGES` to send your own message.")
            .then(msg => msg.delete({ timeout: 5000 }));
    }
    //Response of the bot, react based on the response
    const res = await message.client.api.channels(message.channel.id).messages(message.id).crosspost().post().catch(e => Promise.resolve(e));

    //If you are being rate limited, react to your message with a clock
    if (res?.message === 'You are being rate limited.') return await reaction(message, config.autoPublishEmojis.CLOCK);

    //If the message is published, react to your message with the megaphone
    if (res?.id === message.id){
        return await
            reaction(message, config.autoPublishEmojis.MEGAPHONE) &&
            message.channel.send(`:white_check_mark: Successfully published message!! ID is : \`${msg.id}\``);
    }

    //If the message has already been published, react to your message with an exclamation mark
    if (res?.code === 40033) return await reaction(message, config.autoPublishEmojis.EXCLAMATION);



};

function reaction(msg, emoji){
    if (!msg.channel.permissionsFor(msg.member).has('ADD_REACTIONS')) return ;
    return msg.react(emoji)
        .then((react) => setTimeout(() => react.remove(), 2000));
}

function checkPermission (msg) {
    if(
        !msg.channel.permissionsFor(msg.member).has('MANAGE_MESSAGES') ||
        !msg.channel.permissionsFor(msg.member).has('SEND_MESSAGES')
    ){
        msg.channel.send(":x: You must have the permissions `MANAGE_MESSAGE` to use this command");
        return reaction(msg,config.autoPublishEmojis.ROTATING_LIGHT);
    }
}

async function getMessage(message, arg){
    const get = async (msg, channel) =>{
        return new Promise(resolve => {
            message.client.channels.fetch(channel).then(ch =>{
                if(!ch){
                    resolve([null,null]);
                    return;
                }

                const m = ch.messages.cache.get(msg);
                if (m){
                    resolve([msg,ch]);
                    return;
                }

                ch.messages.fetch(msg)
                    .then((ct) => resolve([ct,ch]))
                    .catch(() => resolve([null,ch]));
            });
        })
    }

    let foundMsg;
    let urlRegex = new RegExp('https?:\/\/(?:canary\.|ptb\.)?discord(?:app)?\.com\/channels\/(?<guild>\\d{16,18})\/(?<channel>\\d{16,18})\/(?<message>\\d{16,18})');
    const parsedUrl = urlRegex.exec(arg);
    if (parsedUrl){
        foundMsg = await get(parsedUrl.groups?.message, parsedUrl.groups?.channel);
    }else{
        foundMsg = await get(arg, message.channel.id);
    }
    return foundMsg;
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["p", "publish"],
    permLevel: "Moderator"
};

exports.help = {
    name: "publish",
    category: "Miscellaneous",
    description: "Publish a message who is in an announcement channel in the server. The announcement channel can be set in the server settings.",
    usage: "publish <value>"
};
