const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, id, replayedEvents) => {
	try {
		const data = { 
			action: "SHARD_RESUME", 
			id, 
			replayedEvents 
		};
		dbLogging(data);
	} catch (err) {
		console.error(err);
	}
};
