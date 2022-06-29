import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "@discordjs/builders";

import { Command } from "../interfaces/commands/Command";
import { CommandHandler } from "../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../modules/heptagramErrorHandler";

import { handleInvalidSubcommand } from "./subcommands/handleInvalidSubcommand";
import { handleAvatar } from "./subcommands/utils/handleAvatar";

const handlers: { [key: string]: CommandHandler } = {
  avatar: handleAvatar,
};

export const utils: Command = {
  data: new SlashCommandBuilder()
    .setName("utils")
    .setDescription("Utilities")
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("avatar")
        .setDescription("Gets the avatar of a user.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user to get the avatar of.")
            .setRequired(true)
        )
    ),
  run: async (Heptagram, interaction) => {
    try {
      await interaction.deferReply();
      const subcommand = interaction.options.getSubcommand();
      const handler = handlers[subcommand] || handleInvalidSubcommand;
      await handler(Heptagram, interaction);
      Heptagram.pm2.metrics.commands.mark();
    } catch (err) {
      const errorId = await heptagramErrorHandler(
        Heptagram,
        "utils group command",
        err,
        interaction.guild?.name,
        undefined,
        interaction
      );
      await interaction.editReply({
        embeds: [errorEmbedGenerator(Heptagram, "utils group", errorId)],
      });
    }
  },
};
