const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, rateLimit) => {
	try {
		const data = { action: 'RATE_LIMIT', rateLimit };
		dbLogging(data);
	} catch (err) {
		console.error(err);
	}
};
