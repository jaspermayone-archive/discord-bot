import {
  GuildMember,
  EmbedBuilder,
  TextBasedChannel,
  PermissionFlagsBits,
} from "discord.js";

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
    const kickMembers = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.KickMembers
    );
    const banMembers = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.BanMembers
    );
    const manageNicknames = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.ManageNicknames
    );

    const changeNickname = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.ChangeNickname
    );

    const viewAuditLog = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.ViewAuditLog
    );

    const manageEvents = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.ManageEvents
    );

    const moderateMembers = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.ModerateMembers
    );

    const sendMessages = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.SendMessages
    );

    const sendMessagesInThreads = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.SendMessagesInThreads
    );

    const createPublicThreads = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.CreatePublicThreads
    );

    const createPrivateThreads = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.CreatePrivateThreads
    );

    const manageMessages = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.ManageMessages
    );

    const manageThreads = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.ManageThreads
    );

    const embedLinks = HeptagramBot.permissionsIn(channel.id).has("EmbedLinks");

    const readMessageHistory = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.ReadMessageHistory
    );

    const addReactions = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.AddReactions
    );

    const useExternalEmojis = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.UseExternalEmojis
    );

    const useExternalStickers = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.UseExternalStickers
    );

    const muteMembers = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.MuteMembers
    );

    const deafenMembers = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.DeafenMembers
    );

    const moveMembers = HeptagramBot.permissionsIn(channel.id).has(
      PermissionFlagsBits.MoveMembers
    );

    const permissionEmbed = new EmbedBuilder();
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
    permissionEmbed.setColor(Heptagram.colors.default);
    permissionEmbed.setTimestamp();
    permissionEmbed.setFooter({
      text: `ID: ${channel.id}`,
    });

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
