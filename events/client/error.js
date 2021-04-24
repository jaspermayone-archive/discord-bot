const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, error) => {
	try {
		const data = { action: 'ERROR', error };
		dbLogging(data);
	} catch (err) {
		console.error(err);
	}
};
