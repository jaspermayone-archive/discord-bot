import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client } from "discord.js";
import { heptagramLogHandler } from "../utils/heptagramLogHandler";


export const onReady = (Heptagram: Client) => {
  if (process.env.NODE_ENV === "production") {
    heptagramLogHandler.log("info", `Heptagram Started in PRODUCTION Mode`);
  }
  if (process.env.NODE_ENV === "development") {
    heptagramLogHandler.log("info", `Heptagram Started in DEVELOPMENT Mode`);
  }

  heptagramLogHandler.log("info",
    `Logged in as ${Heptagram?.user?.tag !== null}. Ready on ${
      Heptagram?.guilds?.cache?.size
    } servers, for a total of ${Heptagram.users.cache.size} users`
  );

  Heptagram?.user?.setStatus("online");
  Heptagram?.user?.setActivity(`${Heptagram.guilds.cache.size} servers!`, {
    type: "WATCHING",
  });

  heptagramLogHandler.log("info", "Bot online and Ready!");
};
