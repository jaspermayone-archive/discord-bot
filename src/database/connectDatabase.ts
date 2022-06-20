import { connect } from "mongoose";
import { heptagramLogHandler } from "../utils/heptagramLogHandler";

export const connectDatabase = async () => {
  await connect(process.env.MONGO_URI as string);
  heptagramLogHandler.log("info","Database Connected!");
};
