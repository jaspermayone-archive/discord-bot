import { EmbedBuilder } from "discord.js";

import { defaultServer } from "../../config/database/defaultServer";
import { ListenerHandler } from "../../interfaces/listeners/ListenerHandler";
import { heptagramErrorHandler } from "../../modules/heptagramErrorHandler";
import { customSubstring } from "../../utils/customSubstring";

/**
 * Detects links in a message and responds accordingly.
 */
export const automodLinks: ListenerHandler = async (
  Heptagram,
  message,
  config
) => {
  try {
    const contentWithoutCode = message.content.replace(
      /`{3}([\S]+)?\n((?!`{3})((?!```)[\s\S])+)\n`{3}/gi,
      ""
    );

    const allowedLinkList: RegExpMatchArray = [];
    const blockedLinkList: RegExpMatchArray = [];

    if (config.allowed_links.length) {
      for (const str of config.allowed_links) {
        const regex = new RegExp(str, "ig");
        const matches = contentWithoutCode.match(regex);
        if (matches) {
          allowedLinkList.push(...matches);
        }
      }
    }

    if (config.automod_roles.length) {
      for (const role of config.automod_roles) {
        if (message.member?.roles.cache.find((r) => r.id === role)) {
          return;
        }
      }
    }

    const linkRegex =
      /(https?:\/\/(([a-z0-9-]+\.)+([a-z]{2,})))(:[\d]{1,5})?[^\s]*/gi;

    const blockedMatches = contentWithoutCode.match(linkRegex);
    if (blockedMatches) {
      blockedLinkList.push(...blockedMatches);
    }

    const blockedLinks = blockedLinkList.length;
    const allowedLinks = allowedLinkList.length;

    if (blockedLinks > 0 && blockedLinks !== allowedLinks) {
      if (message.deletable) {
        await message.delete();
      }
      const linkEmbed = new EmbedBuilder();
      linkEmbed.setTitle("Automod: Links");
      linkEmbed.setDescription(
        (config.link_message || defaultServer.link_message).replace(
          /\{@username\}/g,
          `<@!${message.author.id}>`
        )
      );
      linkEmbed.setColor(Heptagram.colors.error);
      linkEmbed.setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL(),
      });
      linkEmbed.setFooter({
        text: `Message sent by Heptagram || ${Heptagram.version}`,
        iconURL: `${Heptagram.user?.avatarURL()}`,
      });
      const warning = await message.channel.send({ embeds: [linkEmbed] });

      setTimeout(async () => {
        await warning.delete();
      }, 300000);

      const dmEmbed = new EmbedBuilder();
      dmEmbed.setTitle("Your message has been deleted...");
      dmEmbed.setDescription(
        "Your message has been deleted because it contained a link."
      );
      dmEmbed.setColor(Heptagram.colors.error);
      dmEmbed.addFields([
        {
          name: `Message`,
          value: `${customSubstring(message.content, 1000)}`,
          inline: false,
        },
        {
          name: `Channel`,
          value: `<#${message.channel.id}>`,
          inline: false,
        },
        {
          name: `Server`,
          value: `${message.guild?.name}`,
          inline: false,
        },
      ]);

      await message.author.send({ embeds: [dmEmbed] }).catch(() => null);
    }
  } catch (err) {
    await heptagramErrorHandler(
      Heptagram,
      "links automodder",
      err,
      message.guild?.name,
      message
    );
  }
};
