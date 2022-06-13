import { readFile } from "fs/promises";
import http from "http";
import https from "https";

import cors from "cors";
import express from "express";

// create a async function
export async function serverInit() {
  const app = express();

  app.get("/", (req, res) => {
    res.status(200).json({
      status: "alive",
      bot_version: process.env.npm_package_version as string,
    });
  });

  if (process.env.NODE_ENV === "development") {
    app.listen(8000, () => console.log("Ping! Express running on port 8000"));
  }

  if (process.env.NODE_ENV === "production") {
    const privateKey = await readFile(
      "/etc/letsencrypt/live/discord-bot.heptagrambotproject.com/privkey.pem",
      "utf8"
    );
    const certificate = await readFile(
      "/etc/letsencrypt/live/discord-bot.heptagrambotproject.com/cert.pem",
      "utf8"
    );
    const ca = await readFile(
      "/etc/letsencrypt/live/discord-bot.heptagrambotproject.com/chain.pem",
      "utf8"
    );

    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(8000, () => {
      console.log("http", "https server listening on port 443");
    });
  }
}
