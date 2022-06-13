import { Client } from "discord.js";
import "dotenv/config";

import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";
import { serverInit } from "./server/serve";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  if (!validateEnv()) return;

  const Heptagram = new Client({ intents: IntentOptions });

  Heptagram.on("ready", async () => await onReady(Heptagram));

  Heptagram.on(
    "interactionCreate",
    async (interaction) => await onInteraction(interaction)
  );

  await connectDatabase();

  Heptagram.login(process.env.DISCORD_TOKEN);

  await serverInit();
})();
