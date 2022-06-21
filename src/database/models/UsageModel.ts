import { model, Schema } from "mongoose";

import { Usage } from "../../interfaces/database/Usage";

export const UsageSchema = new Schema({
  command: String,
  subcommand: String,
  uses: Number,
});

export default model<Usage>("usage", UsageSchema);
