const logger = require("../utils/Logger.js");
const { getSettings, permlevel } = require("../utils/functions.js");
const config = require("../config/intents.js");
const { MessageEmbed } = require('discord.js');

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
      interaction.followUp({ content: `There was a problem with your request. Please contact a developer in our support server for assistance. You can run \`${settings.prefix}support\` for an invite if needed.\` \n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred following up on an error", e));
    else 
    if (interaction.deferred)
      interaction.editReply({ content: `There was a problem with your request. Please contact a developer in our support server for assistance. You can run \`${settings.prefix}support\` for an invite if needed.\` \n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred following up on an error", e));
    else 
      interaction.reply({ content: `There was a problem with your request. Please contact a developer in our support server for assistance. You can run \`${settings.prefix}support\` for an invite if needed.\` \n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred replying on an error", e));
  }
};
