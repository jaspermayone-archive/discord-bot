import { UserFlagsString } from "discord.js";

/**
 * An object to map Discord API values for user badges into
 * human readable strings.
 */
export const UserFlagMap: Record<UserFlagsString, string> = {
  DISCORD_EMPLOYEE: "Staff",
  PARTNERED_SERVER_OWNER: "Discord Partner",
  HYPESQUAD_EVENTS: "Hypesquad Events",
  BUGHUNTER_LEVEL_1: "Discord Bug Hunter",
  HOUSE_BRAVERY: "Hypesquad House Bravery",
  HOUSE_BRILLIANCE: "Hypesquad House Brilliance",
  HOUSE_BALANCE: "Hypesquad House Balance",
  EARLY_SUPPORTER: "Early Supporter",
  VERIFIED_BOT: "Verified Discord Bot",
  EARLY_VERIFIED_BOT_DEVELOPER: "Verified Bot Developer",
  BUGHUNTER_LEVEL_2: "Discord Gold Bug Hunter",
  TEAM_USER: "Unrecognised Badge",
  DISCORD_CERTIFIED_MODERATOR: "Discord Certified Moderator",
  BOT_HTTP_INTERACTIONS: "Interaction Based Bot",
};
