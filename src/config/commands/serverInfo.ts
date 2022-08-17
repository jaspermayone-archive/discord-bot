import { GuildExplicitContentFilter, GuildVerificationLevel } from "discord.js";

/**
 * An object to map Discord API values for server verification levels to
 * human readable formats.
 */
export const accountVerificationMap = {
  [GuildVerificationLevel.None]: "NONE - Unrestricted",
  [GuildVerificationLevel.Low]:
    "LOW - Must have a verified email on your Discord account.",
  [GuildVerificationLevel.Medium]:
    "MEDIUM - Must be registered on Discord for longer than 5 minutes.",
  [GuildVerificationLevel.High]:
    "HIGH - Must be a member of this server for longer than 10 minutes.",
  [GuildVerificationLevel.VeryHigh]:
    "VERY_HIGH - Must have a verified phone on your Discord account.",
};

/**
 * An object to map Discord API values for server content filtering levels
 * to human readable formats.
 */
export const contentFilterMap = {
  [GuildExplicitContentFilter.Disabled]:
    "Messages will not be scanned for explicit content.",
  [GuildExplicitContentFilter.MembersWithoutRoles]:
    "Messages from members without roles will be scanned for explicit content.",
  [GuildExplicitContentFilter.AllMembers]:
    "All messages will be scanned for explicit content.",
};
