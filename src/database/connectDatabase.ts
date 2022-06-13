import { connect } from "mongoose";

export const connectDatabase = async () => {
  await connect(process.env.MONGO_URI as string);
  console.log("Database Connected!");
};
