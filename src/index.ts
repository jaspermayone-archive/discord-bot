import { ActivityType, Client, WebhookClient } from "discord.js";
import "dotenv/config";

import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { handleEvents } from "./events/handleEvents";
import { Heptagram } from "./interfaces/Heptagram";
import { loadCommands } from "./modules/commands/loadCommands";
import { registerCommands } from "./modules/commands/owner/registerCommands";
import { heptagramErrorHandler } from "./modules/heptagramErrorHandler";
import * as logger from "./modules/heptagramLogger";
import { loadPM2 } from "./modules/loadPM2";
import { validateEnv } from "./utils/validateEnv";
import { validateNode } from "./utils/validateNode";

/**
 * This is the entry point for Heptagram's process. This will log the boot process,
 * call the necessary helpers to prepare Heptagram, and then log in to Discord.
 */
void (async () => {
  logger.info("Starting bot...");

  const validatedNode = await validateNode();
  if (!validatedNode.valid) {
    logger.error(validatedNode.message);
    process.exit(1);
  } else {
    logger.info(validatedNode.message);
  }

  const Heptagram = new Client({
    shards: "auto",
    intents: IntentOptions,
    allowedMentions: { parse: ["users", "roles"], repliedUser: true },
  }) as Heptagram;

  logger.info("Validating environment variables...");
  const validatedEnvironment = await validateEnv(Heptagram);
  if (!validatedEnvironment.valid) {
    logger.error(validatedEnvironment.message);
    return;
  } else {
    logger.info("Environment variables validated.");
  }

  logger.info("Loading PM2...");
  const loadedPM2 = await loadPM2(Heptagram);
  if (!loadedPM2) {
    logger.error("Unable to load Grafana metrics");
    return;
  } else {
    logger.info("PM2 loaded.");
  }

  Heptagram.debugHook = new WebhookClient({ url: Heptagram.configs.logsWH });
  Heptagram.feedbackHook = new WebhookClient({
    url: Heptagram.configs.feadbackWH,
  });

  /* This catches when the process is about to exit
and destroys the discord.js client in order to allow for a graceful shutdown. */
  process.on("exit", () => {
    logger.info("Shutting down gracefully...");
    Heptagram.destroy();
  });

  /**
   * Fallthrough error handlers. These fire in rare cases where something throws
   * in a way that our standard catch block cannot see it.
   */
  process.on("unhandledRejection", async (error: Error) => {
    await heptagramErrorHandler(Heptagram, "Unhandled Rejection Error", error);
    await logger.error(`${error}`);
  });

  process.on("uncaughtException", async (error) => {
    await heptagramErrorHandler(Heptagram, "Uncaught Exception Error", error);
    await logger.error(`${error}`);
  });

  logger.info("Importing commands...");
  const commands = await loadCommands(Heptagram);
  // eslint-disable-next-line require-atomic-updates
  Heptagram.commands = commands;
  if (!commands.length) {
    logger.error("failed to import commands.");
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    logger.info("Registering commands in development...");
    const success = await registerCommands(Heptagram);
    if (!success) {
      logger.error("failed to register commands.");
      return;
    }
  }

  logger.info("Connecting to database...");
  const databaseConnection = await connectDatabase(Heptagram);
  if (!databaseConnection) {
    logger.error("failed to connect to database.");
    return;
  } else {
    logger.info("Database connected.");
  }

  logger.info("Attaching event listeners...");
  handleEvents(Heptagram);

  logger.info("Connecting to Discord...");
  await Heptagram.login(Heptagram.configs.token);
  logger.info("Setting activity...");

  Heptagram.user?.setActivity({
    name: `over ${Heptagram.guilds.cache.size} guilds`,
    type: ActivityType.Watching,
  });

  logger.ready("Heptagram is now running.");
})();

export default Heptagram;
