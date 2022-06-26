/**
 * An object to map Discord API values for server verification levels to
 * human readable formats.
 */
export const accountVerificationMap = {
  NONE: "NONE - Unrestricted",
  LOW: "LOW - Must have a verified email on your Discord account.",
  MEDIUM: "MEDIUM - Must be registered on Discord for longer than 5 minutes.",
  HIGH: "HIGH - Must be a member of this server for longer than 10 minutes.",
  VERY_HIGH: "VERY_HIGH - Must have a verified phone on your Discord account.",
};

/**
 * An object to map Discord API values for server content filtering levels
 * to human readable formats.
 */
export const contentFilterMap = {
  DISABLED: "Messages will not be scanned for explicit content.",
  MEMBERS_WITHOUT_ROLES:
    "Messages from members without roles will be scanned for explicit content.",
  ALL_MEMBERS: "All messages will be scanned for explicit content.",
};
