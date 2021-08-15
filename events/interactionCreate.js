/* eslint-disable no-shadow */
module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;
  const cmd = client.slashcmds.get(interaction.commandName);
  if (!cmd) return;
  try {
    await cmd.run(client, interaction);
  }
  catch (e) {
    console.error(e);
    if (interaction.replied) {
      interaction.followUp({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred following up on an error", e));
    }
    else {
      interaction.reply({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true })
        .catch(e => console.error("An error occurred replying on an error", e));
    }
  }
};
