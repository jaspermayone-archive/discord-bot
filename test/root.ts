import mongoose from "mongoose";

setup(() => {
  const modelNames = Object.keys(mongoose.connection.models);
  for (const model of modelNames) {
    delete mongoose.connection.models[model];
  }
});
