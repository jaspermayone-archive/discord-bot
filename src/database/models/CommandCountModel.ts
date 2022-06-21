import { model, Schema } from "mongoose";

import { CommandCount } from "../../interfaces/database/CommandCount";

export const CommandCountSchema = new Schema<CommandCount>({
  serverId: String,
  serverName: String,
  serverAvatar: String,
  commandUses: Number,
});

export default model<CommandCount>("command", CommandCountSchema);
