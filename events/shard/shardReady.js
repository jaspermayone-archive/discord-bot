const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, id, unavailableGuilds) => {
	try {
		// no guild property
		const log = { action: "SHARD_READY" };
		await dbLogging(log, { id, unavailableGuilds });
	} catch (err) {
		console.error(err);
	}
};
