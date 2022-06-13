export const validateEnv = () => {
  if (!process.env.NODE_ENV) {
    console.warn("Missing NODE_ENV.");
    return false;
  }

  if (!process.env.DISCORD_TOKEN) {
    console.warn("Missing Discord bot token.");
    return false;
  }

  if (!process.env.MONGO_URI) {
    console.warn("Missing MongoDB connection uri.");
    return false;
  }

  if (!process.env.TEST_GUILD_ID) {
    console.warn("Missing test guild id.");
    return false;
  }

  if (!process.env.HOME_GUILD_ID) {
    console.warn("Missing home guild id.");
    return false;
  }

  if (!process.env.OWNER_ID) {
    console.warn("Missing owner id.");
    return false;
  }

  if (!process.env.CLIENT_ID) {
    console.warn("Missing client id.");
    return false;
  }

  return true;
};
