/**
 * Autopublish command, where the bot publish automatically a message in a news channel.
 * The channel must be setup when the bot arrives on the server, and the bot need to be able to manage messages.
 */

const config = require("../config");
const { getSettings }= require("../utils/functions");

exports.run = (client, message, args, level) =>{

};

async function autopublish (message, arg) {
    const settings = message.settings = getSettings(message.guild);
    const autoPublishChannel = settings["autoPublishChannel"];


    const CLOCK = '⏲️';
    const MEGAPHONE = '📢';
    const EXCLAMATION = '❗';
    const ROTATING_LIGHT = '🚨';

    //Check if the you have persmission to manage messages and send messages
    if(
        !message.channel.permissionsFor(message.member).has('MANAGE_MESSAGES') ||
        !message.channel.permissionsFor(message.member).has('SEND_MESSAGES')
    ) return reaction(message, ROTATING_LIGHT);

    const res = await message.client.api.channels(message.channel.id).messages(message.id).crosspost().post();

    if (res?.message === 'You are being rate limited.') return await reaction(message, CLOCK);
    if (res?.id === message.id) return await reaction(message, MEGAPHONE);
    if (res?.code === 40033) return await reaction(message, EXCLAMATION);


    if(!arg) return message.channel.send(`:x: You must precise the link or id of the message you want to publish. *Exemple : \`${settings.prefix}publish [link-to-your-message]*`);

}

function reaction(msg, emoji){
    if (!msg.channel.permissionsFor(msg.member).has('ADD_REACTIONS')) return ;
    return msg.react(emoji)
        .then((r) => setTimeout(() => r.remove(), 2000));
}

function checkPermission (msg, channel) {
    if(!channel.permissionsFor(msg.member).has('MANAGE_MESSAGES')){
        msg.channel.send(":x: You must have `MANAGE_CHANNEL` to use this command.");
        return reaction(msg,'🚨');

    }
}
