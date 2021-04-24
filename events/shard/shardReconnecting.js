const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, id) => {
	try {
		const data = { 
			action: "SHARD_RECONNECTING", 
			id 
		};
		dbLogging(data);
	} catch (err) {
		console.error(err);
	}
};
