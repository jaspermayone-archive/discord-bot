const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, error, shardID) => {
	try {
		// no guild property
		const log = { action: "SHARD_ERROR" };
		await dbLogging(log, { error, shardID });
	} catch (err) {
		console.error(err);
	}
};
