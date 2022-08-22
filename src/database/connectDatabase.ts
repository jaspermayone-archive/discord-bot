import { EmbedBuilder } from "discord.js";
import mongoose from "mongoose";

import { Heptagram } from "../interfaces/Heptagram";
import { heptagramErrorHandler } from "../modules/heptagramErrorHandler";

/**
 * Instantiates the database connection.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @returns {boolean} True if the connection was successful.
 */
export const connectDatabase = async (
  Heptagram: Heptagram
): Promise<boolean> => {
  try {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: 5,
      reconnectInterval: 1000,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
      useFindAndModify: false,
    };

    await mongoose.connect(Heptagram.configs.mongoUri, dbOptions);
    // eslint-disable-next-line require-atomic-updates
    mongoose.Promise = global.Promise;

    const databaseEmbed = new EmbedBuilder();
    databaseEmbed.setTitle("Database connected!");
    databaseEmbed.setDescription(
      `${
        Heptagram.user?.username || "Heptagram"
      } has connected to its database.`
    );
    databaseEmbed.setTimestamp();
    databaseEmbed.setColor(Heptagram.colors.success);
    await Heptagram.debugHook.send({
      embeds: [databaseEmbed],
    });

    return true;
  } catch (err) {
    await heptagramErrorHandler(Heptagram, "database connection", err);
    return false;
  }
};
