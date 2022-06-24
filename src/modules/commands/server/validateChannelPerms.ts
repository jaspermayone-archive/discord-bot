import { GuildMember, MessageEmbed, TextBasedChannel } from "discord.js";

import { Heptagram } from "../../../interfaces/Heptagram";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Validates that Heptagram has the expected channel-level permissions.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @param {GuildMember} HeptagramBot Heptagram's guild member object for that server.
 * @param {TextBasedChannel} channel The channel to check permissions on.
 * @returns {boolean} True if Heptagram has ALL required permissions, false otherwise.
 */
export const validateChannelPerms = async (
  Heptagram: Heptagram,
  HeptagramBot: GuildMember,
  channel: TextBasedChannel
): Promise<boolean> => {
  try {
    const manageServer = HeptagramBot.permissionsIn(channel.id).has(
      "MANAGE_GUILD"
    );
    const manageRoles = HeptagramBot.permissionsIn(channel.id).has(
      "MANAGE_ROLES"
    );
    const manageChannels = HeptagramBot.permissionsIn(channel.id).has(
      "MANAGE_CHANNELS"
    );
    const kickMembers = HeptagramBot.permissionsIn(channel.id).has(
      "KICK_MEMBERS"
    );
    const banMembers = HeptagramBot.permissionsIn(channel.id).has("BAN_MEMBERS");
    const sendMessages = HeptagramBot.permissionsIn(channel.id).has(
      "SEND_MESSAGES"
    );
    const manageMessages = HeptagramBot.permissionsIn(channel.id).has(
      "MANAGE_MESSAGES"
    );
    const embedLinks = HeptagramBot.permissionsIn(channel.id).has("EMBED_LINKS");
    const attachFiles = HeptagramBot.permissionsIn(channel.id).has(
      "ATTACH_FILES"
    );
    const readMessageHistory = HeptagramBot.permissionsIn(channel.id).has(
      "READ_MESSAGE_HISTORY"
    );
    const addReactions = HeptagramBot.permissionsIn(channel.id).has(
      "ADD_REACTIONS"
    );
    const useEmotes = HeptagramBot.permissionsIn(channel.id).has(
      "USE_EXTERNAL_EMOJIS"
    );
    const manageNicknames = HeptagramBot.permissionsIn(channel.id).has(
      "MANAGE_NICKNAMES"
    );
    const moderateMembers = HeptagramBot.permissionsIn(channel.id).has(
      "MODERATE_MEMBERS"
    );
    const viewChannel = HeptagramBot.permissionsIn(channel.id).has(
      "VIEW_CHANNEL"
    );
    const readMessages = HeptagramBot.permissionsIn(channel.id).has(
      "READ_MESSAGE_HISTORY"
    );

    const permissionEmbed = new MessageEmbed();
    permissionEmbed.setTitle("Chennel Level Permissions");
    permissionEmbed.setDescription(
      "Here are the permissions that I have in this channel."
    );
    permissionEmbed.addFields([
      {
        name: "Manage Server",
        value: `${manageServer}`,
        inline: true,
      },
      {
        name: "Manage Roles",
        value: `${manageRoles}`,
        inline: true,
      },
      {
        name: "Manage Channels",
        value: `${manageChannels}`,
        inline: true,
      },
      {
        name: "Kick Members",
        value: `${kickMembers}`,
        inline: true,
      },
      {
        name: "Ban Members",
        value: `${banMembers}`,
        inline: true,
      },
      {
        name: "Send Messages",
        value: `${sendMessages}`,
        inline: true,
      },
      {
        name: "Manage Messages",
        value: `${manageMessages}`,
        inline: true,
      },
      {
        name: "Embed Links",
        value: `${embedLinks}`,
        inline: true,
      },
      {
        name: "Attach Files",
        value: `${attachFiles}`,
        inline: true,
      },
      {
        name: "Read Message History",
        value: `${readMessageHistory}`,
        inline: true,
      },
      {
        name:  "Add Reactions",
        value: `${addReactions}`,
        inline: true,
      },
      {
        name: "Use Emotes",
        value: `${useEmotes}`,
        inline: true,
      },
      {
        name: "Manage Nicknames",
        value: `${manageNicknames}`,
        inline: true,
      },
      {
        name: "Moderate Members",
        value: `${moderateMembers}`,
        inline: true,
      },
      {
        name: "View Channel",
        value: `${viewChannel}`,
        inline: true,
      },
      {
        name: "Read Messages",
        value: `${readMessages}`,
        inline: true,
      },
    ]);
    permissionEmbed.setColor(Heptagram.colors.default);
    permissionEmbed.setTimestamp();
    permissionEmbed.setFooter({
      text: `ID: ${channel.id}`
    });

    await channel.send({ embeds: [permissionEmbed] });

    return (
      manageServer &&
      manageRoles &&
      manageChannels &&
      kickMembers &&
      banMembers &&
      sendMessages &&
      manageMessages &&
      embedLinks &&
      attachFiles &&
      readMessageHistory &&
      addReactions &&
      useEmotes &&
      manageNicknames &&
      moderateMembers &&
      viewChannel &&
      readMessages
    );
  } catch (err) {
    await heptagramErrorHandler(Heptagram, "validate channel perms module", err);
    return false;
  }
};
