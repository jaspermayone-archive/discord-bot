import { readFile } from "fs/promises";
import http from "http";
import https from "https";

import cors from "cors";
import express from "express";

import { Heptagram } from "../interfaces/Heptagram";
import { heptagramErrorHandler } from "../modules/heptagramErrorHandler";
import { heptagramLogHandler } from "../modules/heptagramLogHandler";

/**
 * Spins up a basic web server for uptime monitoring.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @returns {boolean} True if the server was started, false if it crashed.
 */
export const createServer = async (Heptagram: Heptagram): Promise<boolean> => {
  try {
    const HTTPEndpoint = express();
    HTTPEndpoint.disable("x-powered-by");
    HTTPEndpoint.use(cors());

    HTTPEndpoint.use("/", (_, res) => {
      res.status(200).send("Ping!");
    });

    const httpPort = 8000;

    const httpServer = http.createServer(HTTPEndpoint);

    httpServer.listen(httpPort, () => {
      heptagramLogHandler.log(
        "http",
        `http server is live on port ${httpPort}`
      );
    });

    if (process.env.NODE_ENV === "development") {
      HTTPEndpoint.listen(8000, () =>
        heptagramLogHandler.log("http", "Ping! Express running on port 8000")
      );
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

      const httpsServer = https.createServer(credentials, HTTPEndpoint);
      httpsServer.listen(1443, () => {
        heptagramLogHandler.log("http", "https server is live on port 443");
      });
    }
    return true;
  } catch (err) {
    await heptagramErrorHandler(Heptagram, "create server", err);
    return false;
  }
};
