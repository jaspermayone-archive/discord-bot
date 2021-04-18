const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, event, id) => {
	try {
		// no guild property
		const log = { action: 'SHARD_DISCONNECT' };
		await dbLogging(log, { event, id });
	} catch (err) {
		console.error(err);
	}
};
