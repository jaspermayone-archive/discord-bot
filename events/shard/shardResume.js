const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, id, replayedEvents) => {
	try {
		// no guild property
		const log = { action: "SHARD_RESUME" };
		await dbLogging(log, { id, replayedEvents });
	} catch (err) {
		console.error(err);
	}
};
