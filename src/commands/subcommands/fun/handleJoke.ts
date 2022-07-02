import axios from "axios";
import { MessageEmbed } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 *
 */
export const handleJoke: CommandHandler = async (
  Heptagram,
  interaction
): Promise<void> => {
  try {
    const jokeResponse = await axios.get<string>(
      `http://api.heptagrambotproject.com/v4/joke`,
      {
        headers: {
          Authorization: "Bearer " + Heptagram.tokens.heptagramApiToken,
        },
      }
    );

    const embed = new MessageEmbed()
      .setColor(Heptagram.colors.default)
      .setTitle("Here is a random joke for you!")
      .setDescription(jokeResponse.data)
      .setTimestamp()
      .setFooter({
        text: `This command uses our first party API! Find out more about it at https://heptagrambotproject.com/api`,
        iconURL: `${Heptagram.user?.avatarURL()}`,
      });

    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "encouragement command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "encouragement", errorId)],
    });
  }
};
