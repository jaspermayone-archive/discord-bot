module.exports = async (Discord, client, rateLimit) => {
	try {
		const data = { action: 'RATE_LIMIT', rateLimit };
	}
	catch (err) {
		console.error(err);
	}
};
