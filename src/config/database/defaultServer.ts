/* eslint-disable camelcase */

/**
 * This config maps the default values for the ServerModel document. Useful
 * for the reset command as well as instantiating new server settings.
 */
export const defaultServer = {
  blocked: [] as string[],
  automod_channels: [] as string[],
  no_automod_channels: [] as string[],
  automod_roles: [] as string[],
  allowed_links: [] as string[],
  link_message:
    "{@username}, you don't have permison to send links in this channel.",
  links: "off",
  antiphish: "none",
};
