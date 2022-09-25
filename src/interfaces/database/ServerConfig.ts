/* eslint-disable camelcase */
import { Document } from "mongoose";

export interface ServerConfig extends Document {
  serverID: string;
  serverName: string;
  blocked: string[];
  automod_channels: string[];
  no_automod_channels: string[];
  automod_roles: string[];
  allowed_links: string[];
  link_message: string;
  links: string;
  antiphish: "none" | "mute" | "kick" | "ban";
}

export const testServerConfig: Omit<ServerConfig, keyof Document> = {
  serverID: "",
  serverName: "",
  blocked: [],
  automod_channels: [],
  no_automod_channels: [],
  automod_roles: [],
  allowed_links: [],
  link_message: "",
  links: "",
  antiphish: "none",
};
