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
import { handleEncouragement } from "./subcommands/fun/handleEncouragement";
import { handleJoke } from "./subcommands/fun/handleJoke";
import { handleMovieQuote } from "./subcommands/fun/handleMovieQuote";
import { handleInvalidSubcommand } from "./subcommands/handleInvalidSubcommand";

const handlers: { [key: string]: CommandHandler } = {
  cat: handleCat,
  coinflip: handleCoinflip,
  moviequote: handleMovieQuote,
  encouragement: handleEncouragement,
  joke: handleJoke,
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
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("moviequote")
        .setDescription("Gets a random movie quote.")
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("encouragement")
        .setDescription("Gets a random encouragement.")
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("joke")
        .setDescription("Gets a random joke.")
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
