/* eslint-disable require-atomic-updates */
import { Client, WebhookClient } from "discord.js";
import "dotenv/config";

import { IntentOptions, PartialsOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { handleEvents } from "./events/handleEvents";
import { Heptagram } from "./interfaces/Heptagram";
import { loadCommands } from "./modules/commands/loadCommands";
import { loadContexts } from "./modules/commands/loadContexts";
import { registerCommands } from "./modules/commands/registerCommands";
import { heptagramErrorHandler } from "./modules/heptagramErrorHandler";
import { heptagramLogHandler } from "./modules/heptagramLogHandler";
import { loadPM2 } from "./modules/loadPM2";
import { createServer } from "./server/serve";
import { validateEnv } from "./utils/validateEnv";
import { validateNode } from "./utils/validateNode";

void (async () => {
  heptagramLogHandler.log("debug", "Starting bot...");

  const validatedNode = await validateNode();
  if (!validatedNode.valid) {
    heptagramLogHandler.log("error", validatedNode.message);
    process.exit(1);
  } else {
    heptagramLogHandler.log("debug", validatedNode.message);
  }

  const Heptagram = new Client({
    shards: "auto",
    intents: IntentOptions,
    partials: PartialsOptions,
  }) as Heptagram;

  heptagramLogHandler.log("debug", "Validating environment variables...");
  const validatedEnvironment = await validateEnv(Heptagram);
  if (!validatedEnvironment.valid) {
    heptagramLogHandler.log("error", `${validatedEnvironment.message}`);
    return;
  } else {
    heptagramLogHandler.log("debug", "Environment variables validated.");
  }

  heptagramLogHandler.log("debug", "Loading PM2...");
  const loadedPM2 = await loadPM2(Heptagram);
  if (!loadedPM2) {
    heptagramLogHandler.log("error", "Unable to load Grafana metrics");
    return;
  } else {
    heptagramLogHandler.log("debug", "PM2 loaded.");
  }

  Heptagram.debugHook = new WebhookClient({ url: Heptagram.configs.whUrl });

  process.on("unhandledRejection", async (error: Error) => {
    await heptagramErrorHandler(Heptagram, "Unhandled Rejection Error", error);
    await heptagramLogHandler.log("error", error);
  });

  process.on("uncaughtException", async (error) => {
    await heptagramErrorHandler(Heptagram, "Uncaught Exception Error", error);
    await heptagramLogHandler.log("error", error);
  });

  heptagramLogHandler.log("debug", "Initialising web server...");
  const server = await createServer(Heptagram);
  if (!server) {
    heptagramLogHandler.log("error", "failed to launch web server.");
    return;
  }

  heptagramLogHandler.log("debug", "Importing commands...");
  const commands = await loadCommands(Heptagram);
  // const contexts = await loadContexts(Heptagram);
  Heptagram.commands = commands;
  //Heptagram.contexts = contexts;
  if (!commands.length /*|| !contexts.length*/) {
    heptagramLogHandler.log("error", "failed to import commands.");
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    heptagramLogHandler.log("debug", "Registering commands in development...");
    const success = await registerCommands(Heptagram);
    if (!success) {
      heptagramLogHandler.log("error", "failed to register commands.");
      return;
    }
  }

  heptagramLogHandler.log("debug", "Connecting to database...");
  const databaseConnection = await connectDatabase(Heptagram);
  if (!databaseConnection) {
    heptagramLogHandler.log("error", "failed to connect to database.");
    return;
  } else {
    heptagramLogHandler.log("debug", "Database connected.");
  }

  heptagramLogHandler.log("debug", "Attaching event listeners...");
  handleEvents(Heptagram);

  heptagramLogHandler.log("debug", "Connecting to Discord...");
  await Heptagram.login(Heptagram.configs.token);
  heptagramLogHandler.log("debug", "Setting activity...");
  Heptagram.user?.setActivity("over your guild", {
    type: "WATCHING",
  });
})();

export default Heptagram;
