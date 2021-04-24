const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, id, unavailableGuilds) => {
	try {
		const data = { 
			action: "SHARD_READY", 
			id, 
			unavailableGuilds 
		};
		dbLogging(data);
	} catch (err) {
		console.error(err);
	}
};
