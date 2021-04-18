const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, id) => {
	try {
		// no guild property
		const log = { action: "SHARD_RECONNECTING" };
		await dbLogging(log, { id });
	} catch (err) {
		console.error(err);
	}
};
