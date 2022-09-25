import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "@discordjs/builders";
import { PermissionFlagsBits } from "discord.js";

import {
  configChoices,
  configViewChoices,
} from "../config/commands/settingsChoices";
import { Command } from "../interfaces/commands/Command";
import { CommandHandler } from "../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../modules/heptagramErrorHandler";

import { handleReset } from "./subcommands/config/handleReset";
import { handleSet } from "./subcommands/config/handleSet";
import { handleView } from "./subcommands/config/handleView";
import { handleInvalidSubcommand } from "./subcommands/handleInvalidSubcommand";

const handlers: { [key: string]: CommandHandler } = {
  set: handleSet,
  reset: handleReset,
  view: handleView,
};

export const config: Command = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Modify your server settings.")
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("set")
        .setDescription("Update a server setting.")
        .addStringOption((option) =>
          option
            .setName("setting")
            .setDescription("The setting to update")
            .setRequired(true)
            .addChoices(...configChoices)
        )
        .addStringOption((option) =>
          option
            .setName("value")
            .setDescription("The value to set.")
            .setRequired(true)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("reset")
        .setDescription("Reset a setting to default.")
        .addStringOption((option) =>
          option
            .setName("setting")
            .setDescription("The setting to reset")
            .setRequired(true)
            .addChoices(...configChoices)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("view")
        .setDescription("View your settings.")
        .addStringOption((option) =>
          option
            .setName("setting")
            .setDescription("The setting list to view.")
            .setRequired(true)
            .addChoices(...configViewChoices)
        )
    ),
  run: async (Heptagram, interaction, serverConfig) => {
    try {
      await interaction.deferReply();
      const { guild, member } = interaction;

      if (!guild || !member) {
        await interaction.editReply({
          content: "This command can only be used in a server.",
        });
        return;
      }

      if (
        (typeof member.permissions === "string" ||
          !member.permissions.has(PermissionFlagsBits.ManageGuild)) &&
        member.user.id !== Heptagram.configs.ownerId
      ) {
        await interaction.editReply({
          content: "You do not have permission to use this command.",
        });
        return;
      }

      const action = interaction.options.getSubcommand();
      const handler = handlers[action] || handleInvalidSubcommand;
      await handler(Heptagram, interaction, serverConfig);
      Heptagram.pm2.metrics.commands.mark();
    } catch (err) {
      const errorId = await heptagramErrorHandler(
        Heptagram,
        "config group command",
        err,
        interaction.guild?.name,
        undefined,
        interaction
      );
      await interaction.editReply({
        embeds: [errorEmbedGenerator(Heptagram, "config group", errorId)],
      });
    }
  },
};
