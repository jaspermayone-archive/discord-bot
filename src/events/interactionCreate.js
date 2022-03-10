const logger = require("../utils/Logger.js");
const { getSettings, permlevel } = require("../utils/functions.js");
const config = require("../config.js");

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const settings = interaction.settings = getSettings(interaction.guild);

  const level = permlevel(interaction);
  
  const cmd = client.container.slashcmds.get(interaction.commandName);
  
  if (!cmd) return;

  if (level < client.container.levelCache[cmd.conf.permLevel]) {
    return await interaction.reply({
      content: `This command can only be used by ${cmd.conf.permLevel}'s only`,
      ephemeral: settings.systemNotice !== "true"
    });
  }

  try {
    await cmd.run(client, interaction);

  } catch (e) {
    console.error(e);
    if (interaction.replied) 
      interaction.followUp({ content: `There was a problem with your request. Please contact a developer in our support server for assistance. You can run \`${settings.prefix}support for an invite if needed.\` \n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred following up on an error", e));
    else 
    if (interaction.deferred)
      interaction.editReply({ content: `There was a problem with your request. Please contact a developer in our support server for assistance. You can run \`${settings.prefix}support for an invite if needed.\` \n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred following up on an error", e));
    else 
      interaction.reply({ content: `There was a problem with your request. Please contact a developer in our support server for assistance. You can run \`${settings.prefix}support for an invite if needed.\` \n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred replying on an error", e));
  }
};

//Autopublisher part
async function autopublish (msg, arg) {
  if(!arg) return msg.channel.send(`:x: You must precise the link or id of the message you want to publish. *Exemple : \`${settings.prefix}publish [link-to-your-message]*`);
  
  /**
   * This is the part where the bot will check if the sender has all the permissions
   * And check if the channel is a channel where you can publish
   */


  const CLOCK = '⏲️';
  const MEGAPHONE = '📢';
  const EXCLAMATION = '❗';
  const ROTATING_LIGHT = '🚨';

  //Check if the you have persmission to manage messages and send messages
  if(
    !msg.channel.permissionFor(msg.guild.me).has('MANAGE_MESSAGES') ||
    !msg.channel.permissionFor(msg.guild.me).has('SEND_MESSAGES')
  ) return reaction(msg, ROTATING_LIGHT);

  const res = await msg.client.api.channels(msg.channel.id).messages(msg.id).crosspost().post();

  if (res?.message === 'You are being rate limited.') return await reaction(msg, CLOCK);
  if (res?.id === msg.id) return await reaction(msg, MEGAPHONE);
  if (res?.code === 40033) return await reaction(msg, EXCLAMATION);
}

function reaction(msg, emoji){
  if (!msg.channel.permissionsFor(msg.guild.me).has('ADD_REACTIONS')) return ;
  return msg.react(emoji)
    .then((r) => setTimeout(() => r.remove(), 2000));
}

function checkPermission (msg, channel) {
  return channel.permissionsFor(msg.member).has('MANAGE_CHANNELS');
}
