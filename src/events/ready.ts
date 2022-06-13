import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client } from "discord.js";

import { CommandList } from "../commands/_CommandList";

export const onReady = async (Heptagram: Client) => {

  if (process.env.NODE_ENV === "production") {
    console.log(`Heptagram Started in PRODUCTION Mode`);
      }
      if (process.env.NODE_ENV === "development") {
        console.log(`Heptagram Started in DEVELOPMENT Mode`);
      }

  const rest = new REST({ version: "9" }).setToken(
    process.env.DISCORD_TOKEN as string
  );

  const commandData = CommandList.map((command) => command.data.toJSON());

  await rest.put(
    Routes.applicationGuildCommands(
      Heptagram.user?.id || "missing id",
      process.env.TEST_GUILD_ID as string
    ),
    { body: commandData }
  );

      console.log(`Logged in as ${Heptagram?.user?.tag!== null}. Ready on ${Heptagram?.guilds?.cache?.size} servers, for a total of ${Heptagram.users.cache.size} users`);

      Heptagram?.user?.setStatus('online');
      Heptagram?.user?.setActivity(`${Heptagram.guilds.cache.size} servers!`, { type: "WATCHING" })

      console.log('Bot online and Ready!');
};
