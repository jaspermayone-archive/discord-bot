import { Document } from "mongoose";

export interface CommandCount extends Document {
  serverId: string;
  serverName: string;
  serverAvatar: string;
  commandUses: number;
}

export const testCommandCount: Omit<CommandCount, keyof Document> = {
  serverId: "test",
  serverName: "test",
  serverAvatar: "test",
  commandUses: 0,
};