import { GuildMember, MessageEmbed, TextBasedChannel } from "discord.js";

import { Heptagram } from "../../../interfaces/Heptagram";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Validates if Heptagram has the expected guild-level permissions.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @param {GuildMember} HeptagramBot Heptagram's guild member object for that server.
 * @param {TextBasedChannel} channel The channel to send the result to.
 * @returns {boolean} True if Heptagram has ALL required permissions, false otherwise.
 */
export const validateServerPerms = async (
  Heptagram: Heptagram,
  HeptagramBot: GuildMember,
  channel: TextBasedChannel
): Promise<boolean> => {
  try {
    const kickMembers = HeptagramBot.permissions.has("KICK_MEMBERS");
    const banMembers = HeptagramBot.permissions.has("BAN_MEMBERS");
    const manageNicknames = HeptagramBot.permissions.has("MANAGE_NICKNAMES");
    const changeNickname = HeptagramBot.permissions.has("CHANGE_NICKNAME");
    const viewAuditLog = HeptagramBot.permissions.has("VIEW_AUDIT_LOG");
    const manageEvents = HeptagramBot.permissions.has("MANAGE_EVENTS");
    const moderateMembers = HeptagramBot.permissions.has("MODERATE_MEMBERS");
    const sendMessages = HeptagramBot.permissions.has("SEND_MESSAGES");
    const sendMessagesInThreads = HeptagramBot.permissions.has(
      "SEND_MESSAGES_IN_THREADS"
    );
    const createPublicThreads = HeptagramBot.permissions.has(
      "CREATE_PUBLIC_THREADS"
    );
    const createPrivateThreads = HeptagramBot.permissions.has(
      "CREATE_PRIVATE_THREADS"
    );
    const manageMessages = HeptagramBot.permissions.has("MANAGE_MESSAGES");
    const manageThreads = HeptagramBot.permissions.has("MANAGE_THREADS");
    const embedLinks = HeptagramBot.permissions.has("EMBED_LINKS");
    const readMessageHistory = HeptagramBot.permissions.has(
      "READ_MESSAGE_HISTORY"
    );
    const addReactions = HeptagramBot.permissions.has("ADD_REACTIONS");
    const useExternalEmojis = HeptagramBot.permissions.has(
      "USE_EXTERNAL_EMOJIS"
    );
    const useExternalStickers = HeptagramBot.permissions.has(
      "USE_EXTERNAL_STICKERS"
    );
    const muteMembers = HeptagramBot.permissions.has("MUTE_MEMBERS");
    const deafenMembers = HeptagramBot.permissions.has("DEAFEN_MEMBERS");
    const moveMembers = HeptagramBot.permissions.has("MOVE_MEMBERS");

    const permissionEmbed = new MessageEmbed();
    permissionEmbed.setTitle("Server Level Permissions");
    permissionEmbed.setDescription(
      "Here are the permissions that I have in this server."
    );
    permissionEmbed.addFields([
      {
        name: "kickMembers",
        value: `${kickMembers}`,
        inline: true,
      },
      {
        name: "changeNickname",
        value: `${changeNickname}`,
        inline: true,
      },
      {
        name: "viewAuditLog",
        value: `${viewAuditLog}`,
        inline: true,
      },
      {
        name: "manageEvents",
        value: `${manageEvents}`,
        inline: true,
      },
      {
        name: "moderateMembers",
        value: `${moderateMembers}`,
        inline: true,
      },
      {
        name: "sendMessages",
        value: `${sendMessages}`,
        inline: true,
      },
      {
        name: "sendMessagesInThreads",
        value: `${sendMessagesInThreads}`,
        inline: true,
      },
      {
        name: "createPublicThreads",
        value: `${createPublicThreads}`,
        inline: true,
      },
      {
        name: "createPrivateThreads",
        value: `${createPrivateThreads}`,
        inline: true,
      },
      {
        name: "manageMessages",
        value: `${manageMessages}`,
        inline: true,
      },
      {
        name: "manageThreads",
        value: `${manageThreads}`,
        inline: true,
      },
      {
        name: "embedLinks",
        value: `${embedLinks}`,
        inline: true,
      },
      {
        name: "readMessageHistory",
        value: `${readMessageHistory}`,
        inline: true,
      },
      {
        name: "addReactions",
        value: `${addReactions}`,
        inline: true,
      },
      {
        name: "useExternalEmojis",
        value: `${useExternalEmojis}`,
        inline: true,
      },
      {
        name: "useExternalStickers",
        value: `${useExternalStickers}`,
        inline: true,
      },
      {
        name: "muteMembers",
        value: `${muteMembers}`,
        inline: true,
      },
      {
        name: "deafenMembers",
        value: `${deafenMembers}`,
        inline: true,
      },
      {
        name: "moveMembers",
        value: `${moveMembers}`,
        inline: true,
      },
    ]);

    await channel.send({ embeds: [permissionEmbed] });

    return (
      kickMembers &&
      banMembers &&
      manageNicknames &&
      changeNickname &&
      viewAuditLog &&
      manageEvents &&
      moderateMembers &&
      sendMessages &&
      sendMessagesInThreads &&
      createPublicThreads &&
      createPrivateThreads &&
      manageMessages &&
      manageThreads &&
      embedLinks &&
      readMessageHistory &&
      addReactions &&
      useExternalEmojis &&
      useExternalStickers &&
      muteMembers &&
      deafenMembers &&
      moveMembers
    );
  } catch (err) {
    await heptagramErrorHandler(Heptagram, "validate server perms module", err);
    return false;
  }
};
