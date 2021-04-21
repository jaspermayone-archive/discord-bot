const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, rateLimit) => {
	try {
		// no guild property
		const log = { action: 'RATE_LIMIT' };
		await dbLogging(log, { ...rateLimit });
	} catch (err) {
		console.error(err);
	}
};
