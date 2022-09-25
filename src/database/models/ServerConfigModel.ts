/* eslint-disable camelcase */
import { model, Schema } from "mongoose";

import { ServerConfig } from "../../interfaces/database/ServerConfig";

export const ServerConfigSchema = new Schema({
  serverID: String,
  serverName: String,
  blocked: [String],
  // automod
  automod_channels: [String],
  no_automod_channels: [String],
  automod_roles: [String],
  allowed_links: [String],
  link_message: String,
  links: String,
  antiphish: {
    type: String,
    default: "none",
  },
});

export default model<ServerConfig>("server", ServerConfigSchema);
