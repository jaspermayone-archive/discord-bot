import { Client } from "discord.js";
import "dotenv/config";

import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { onInteractionCreate } from "./events/interactionCreate";
import { onMessageCreate } from "./events/messageCreate";
import { onReady } from "./events/ready";
import { serverInit } from "./server/serve";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  if (!validateEnv()) {
    return;
  }

  const Heptagram = new Client({ intents: IntentOptions });

  Heptagram.on("ready", async () => await onReady(Heptagram));

  Heptagram.on(
    "interactionCreate",
    async (interaction) => await onInteractionCreate(interaction)
  );
  Heptagram.on(
    "messageCreate",
    async (message) => await onMessageCreate(message, Heptagram)
  );

  Heptagram.on("threadCreate", (thread) => {
    thread.join();
  });

  await connectDatabase();

  Heptagram.login(process.env.DISCORD_TOKEN);

  await serverInit();
})();
