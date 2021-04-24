const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, error, shardID) => {
	try {
		const data = {
			action: "SHARD_ERROR",
			error,
			shardID
		};
		dbLogging(data);
	} catch (err) {
		console.error(err);
	}
};
