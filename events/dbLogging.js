const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({}, { strict: false });
const EventModel = mongoose.model("Event", eventSchema);

async function dbLogging(log, data) {
	let createdAt = new Date().toLocaleString();
	let model = { createdAt };
	Object.keys(log).forEach((key) => {
		model[key] = JSON.stringify(log[key]);
	});
	Object.keys(data).forEach((key) => {
		model[key] = JSON.stringify(data[key]);
	});

	let document = new EventModel(model);
	document.save((err) => {
		if (err) {
			console.error(err);
		}
	})
}

module.exports = dbLogging;