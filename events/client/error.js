const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, error) => {
	try {
		// no guild property
		const log = { action: 'ERROR' };
		await dbLogging(log, { ...error });
	} catch (err) {
		console.error(err);
	}
};
