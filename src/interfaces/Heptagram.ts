import io from "@pm2/io";
import Gauge from "@pm2/io/build/main/utils/metrics/gauge";
import Meter from "@pm2/io/build/main/utils/metrics/meter";
import { Client, ColorResolvable, WebhookClient } from "discord.js";

import { Command } from "./commands/Command";
import { Context } from "./contexts/Context";

/**
 * Model used to pass around Heptagrams's Discord client instance with additional
 * configurations attached.
 */
export interface Heptagram extends Client {
  commitHash: string;
  debugHook: WebhookClient;
  configs: {
    nodeEnv: string;
    token: string;
    id: string;
    ownerId: string;
    whUrl: string;
    mongoUri: string;
    testGuildId: string;
    homeGuildId: string;
    heptagramApiToken: string;
    version: string;
    love: string;
    yes: string;
    no: string;
    think: string;
  };
  colors: {
    default: ColorResolvable;
    success: ColorResolvable;
    warning: ColorResolvable;
    error: ColorResolvable;
  };
  commands: Command[];
  contexts: Context[];
  usersToHeart: string[];
  pm2: {
    client: typeof io;
    metrics: {
      events: Meter;
      commands: Meter;
      errors: Meter;
      guilds: Gauge;
      users: Gauge;
    };
  };
}
