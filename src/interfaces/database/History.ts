import { Document } from "mongoose";

export interface History extends Document {
  serverId: string;
  userId: string;
  bans: number;
  kicks: number;
  mutes: number;
  unmutes: number;
  warns: number;
}

export const testHistory: Omit<History, keyof Document> = {
  serverId: "123",
  userId: "123",
  bans: 0,
  kicks: 0,
  mutes: 0,
  unmutes: 0,
  warns: 0,
};
