// For generating a random joke fetch from an API
// Checkout https://jokeapi.dev/#endpoints for more categories

const fetch = require('node-fetch');

const category = "any";
const URL = `https://v2.jokeapi.dev/joke/${category}`; // 120 request per minute limit

function fetchJoke() {
	return fetch(URL)
		.then(res => res.json());
}

module.exports = {
	name: "joke",
	description: "fetch joke from API and send",
	execute({ message, args, roles }) {
		fetchJoke().then(({ setup, delivery}) => {
			message.channel.send(setup);
			// wait 3 seconds before sending the delivery
			setTimeout(() => {
				message.channel.send(delivery);
			}, 3000);
		}).catch(err => console.warn(err));
	},
};
