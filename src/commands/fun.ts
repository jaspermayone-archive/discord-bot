import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "@discordjs/builders";

import { Command } from "../interfaces/commands/Command";
import { CommandHandler } from "../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../modules/heptagramErrorHandler";

import { handleCat } from "./subcommands/fun/handleCat";
import { handleCoinflip } from "./subcommands/fun/handleCoinflip";
import { handleInvalidSubcommand } from "./subcommands/handleInvalidSubcommand";

const handlers: { [key: string]: CommandHandler } = {
  cat: handleCat,
  coinflip: handleCoinflip,
};

export const fun: Command = {
  data: new SlashCommandBuilder()
    .setName("fun")
    .setDescription("Fun commands")
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("cat")
        .setDescription("Gets a random cat image.")
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("coinflip")
        .setDescription("Flips a coin, and provides the results.")
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
        "fun group command",
        err,
        interaction.guild?.name,
        undefined,
        interaction
      );
      await interaction.editReply({
        embeds: [errorEmbedGenerator(Heptagram, "fun group", errorId)],
      });
    }
  },
};
