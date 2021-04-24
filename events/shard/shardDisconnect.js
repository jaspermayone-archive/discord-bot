const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, event, id) => {
	try {
		const data = {
			action: 'SHARD_DISCONNECT',
			event,
			id
		};
		dbLogging(data);
	} catch (err) {
		console.error(err);
	}
};
