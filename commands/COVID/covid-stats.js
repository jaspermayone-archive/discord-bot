// For display basic COVID stats
const fetch = require("node-fetch");

const URL = "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true";

function fetchStats() {
	return fetch(URL).then((res) => res.json());
}

function countryList(data) {
	return data.map(obj => obj.country);
}

function countryStats(country, data) {
	return data.filter(stats => stats.country === country)[0];
}

let blocked = false;

module.exports = {
	name: "covid-stats",
	guildOnly: false,
	description: "Display basic COVID stats of a country",
	execute({ message, args, roles }) {
		// To prevent user spamming the same command
		if (blocked) {
			message.channel.send(
				"Please stop spamming the command."
			);
			return;
		}
		blocked = true;
		fetchStats()
			.then((data) => {
				if (!data) {
					message.channel.send(
						"Please wait a few seconds and try again."
					);
					return;
				}

				return new Promise(function(resolve, reject) {
					// display a list of countries available
					if (args[0] === "list") {
						message.channel.send(countryList(data));
						resolve();
						return;
					}

					// display covid stats for one country
					const filterTerm = args.join(' ');
					const stats = countryStats(filterTerm, data);

					if (!stats) {
						message.channel.send(`Stats not available for ${filterTerm}. Type 'list' as arg for the list of available countries`);
						resolve();
						return;
					}

					const { infected, tested, recovered, deceased, country } = stats;
					let info = `
						Covid Stats for ${country}\n
						Infected: ${infected}\n
						Tested: ${tested}\n
						Recovered: ${recovered}\n
						Deceased: ${deceased}\n
					`;
					message.channel.send(info);
					resolve();
				})
			})
			.then(() => {
				blocked = false;
			})
			.catch((err) => console.warn(err));
	},
};
