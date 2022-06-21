import { Client, WebhookClient } from "discord.js";
import "dotenv/config";

import { IntentOptions, PartialsOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { handleEvents } from "./events/handleEvents";
import { Heptagram } from "./interfaces/Heptagram";
import { createServer } from "./server/serve";
import { heptagramErrorHandler } from "./utils/heptagramErrorHandler";
import { heptagramLogHandler } from "./utils/heptagramLogHandler";
//import { loadCommands } from "./utils/loadCommands";
import { loadPM2 } from "./utils/loadPM2";
//import { registerCommands } from "./utils/registerCommands";
import { validateEnv } from "./utils/validateEnv";

void (async () => {
  const Heptagram = new Client({
    shards: "auto",
    intents: IntentOptions,
    partials: PartialsOptions,
  }) as Heptagram;

  heptagramLogHandler.log("debug", "Validating environment variables...");
  const validatedEnvironment = validateEnv(Heptagram);
  if (!validatedEnvironment.valid) {
    heptagramLogHandler.log("error", `validatedEnvironment.message`);
    return;
  } else {
    heptagramLogHandler.log("debug", "Environment variables validated.");
  }

  heptagramLogHandler.log("debug", "Loading PM2...");
  const loadedPM2 = loadPM2(Heptagram);
  if (!loadedPM2) {
    heptagramLogHandler.log("error", "Unable to load Grafana metrics");
    return;
  } else {
    heptagramLogHandler.log("debug", "PM2 loaded.");
  }

  Heptagram.debugHook = new WebhookClient({ url: Heptagram.configs.whUrl });

  process.on("unhandledRejection", async (error: Error) => {
    await heptagramErrorHandler(Heptagram, "Unhandled Rejection Error", error);
  });

  process.on("uncaughtException", async (error) => {
    await heptagramErrorHandler(Heptagram, "Uncaught Exception Error", error);
  });

  heptagramLogHandler.log("debug", "Initialising web server...");
  const server = await createServer(Heptagram);
  if (!server) {
    heptagramLogHandler.log("error", "failed to launch web server.");
    return;
  }

  /*
  heptagramLogHandler.log("debug", "Importing commands...");
  const commands = await loadCommands(Heptagram);
  // eslint-disable-next-line require-atomic-updates
  Heptagram.commands = commands;
  if (!commands.length) {
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
  */

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
