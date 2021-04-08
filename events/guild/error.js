module.exports = (Discord, client, e) => {
	client.logger.error(e);
	
	client.on('shardError', error => {
		console.error('A websocket connection encountered an error:', error);
	});

	process.on('unhandledRejection', error => {
		console.error('Unhandled promise rejection:', error);
	});
};
