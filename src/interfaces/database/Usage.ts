import { Document } from "mongoose";

export interface Usage extends Document {
  command: string;
  subcommand: string;
  uses: number;
}

export const testUsage: Omit<Usage, keyof Document> = {
  command: "test",
  subcommand: "test",
  uses: 0,
};
