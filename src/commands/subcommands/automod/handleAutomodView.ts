import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Message,
} from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { ArraySettings } from "../../../interfaces/settings/ArraySettings";
import { viewAutomodSettings } from "../../../modules/commands/automod/viewAutomodSettings";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";
import { viewSettingsArray } from "../config/viewSettingsArray";

/**
 * Generates an embed showing the current server `setting` values. If `setting` is global,
 * shows the top-level overview.
 */
export const handleAutomodView: CommandHandler = async (
  Heptagram,
  interaction,
  config
) => {
  try {
    const { guild } = interaction;

    if (!guild) {
      await interaction.editReply({
        content: "This command can only be used in a server.",
      });
      return;
    }

    const setting = interaction.options.getString("setting");

    if (setting === "global") {
      const result = await viewAutomodSettings(Heptagram, guild, config);
      if (!result) {
        await interaction.editReply({
          content: "Failed to view the automod settings.",
        });
        return;
      }
      await interaction.editReply({ embeds: [result] });
      return;
    }

    let page = 1;
    let lastPage = 2;

    let embed = await viewSettingsArray(
      Heptagram,
      config,
      setting as ArraySettings,
      1
    );

    if (!embed) {
      await interaction.editReply({
        content: "Failed to view the automod settings.",
      });
      return;
    }

    const pageBack = new ButtonBuilder()
      .setCustomId("prev")
      .setDisabled(true)
      .setLabel("◀")
      .setStyle(ButtonStyle.Primary);
    const pageForward = new ButtonBuilder()
      .setCustomId("next")
      .setLabel("▶")
      .setStyle(ButtonStyle.Primary);
    lastPage = parseInt(
      embed?.data?.footer?.text?.split(" ").reverse()[0] || "haha",
      10
    );
    if (lastPage === 1) {
      pageForward.setDisabled(true);
    }

    const sent = (await interaction.editReply({
      embeds: [embed],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          pageBack,
          pageForward
        ),
      ],
    })) as Message;

    const buttonCollector = sent.createMessageComponentCollector({
      time: 60000,
      filter: (click) => click.user.id === interaction.user.id,
    });

    buttonCollector.on("collect", async (click) => {
      click.deferUpdate();
      if (click.customId === "prev") {
        page--;
      }
      if (click.customId === "next") {
        page++;
      }

      if (page <= 1) {
        pageBack.setDisabled(true);
      } else {
        pageBack.setDisabled(false);
      }
      if (page >= lastPage) {
        pageForward.setDisabled(true);
      } else {
        pageForward.setDisabled(false);
      }

      embed = await viewSettingsArray(
        Heptagram,
        config,
        setting as ArraySettings,
        page
      );

      if (!embed) {
        await interaction.editReply({
          content: "Failed to view the automod settings.",
        });
        return;
      }

      await interaction.editReply({
        embeds: [embed],
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            pageBack,
            pageForward
          ),
        ],
      });
    });

    buttonCollector.on("end", async () => {
      pageBack.setDisabled(true);
      pageForward.setDisabled(true);
      await interaction.editReply({
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            pageBack,
            pageForward
          ),
        ],
      });
    });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "automod view command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "automod view", errorId)],
    });
  }
};
