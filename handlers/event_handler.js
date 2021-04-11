const fs = require("fs");
const logger = require('../logger');

module.exports = ({ client, Discord }) => {
	const load_dir = (dirs) => {
		const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith(".js"));
		
		for (const file of event_files) {
			const event = require(`../events/${dirs}/${file}`);
			const event_name = file.split('.')[0];
			client.on(event_name, event.bind(null, Discord, client));
			// // log each event in the events directory
			// logger[event_name](client);
		}
	}

	['client', 'guild'].forEach(e => load_dir(e));
};
