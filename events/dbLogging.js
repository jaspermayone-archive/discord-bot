const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// General unrestricted schema for all model
const schema = new Schema({}, { strict: false });

module.exports = function dbLogging(data, guildName="main") {
	// guildName = model name for the database
	let Model = mongoose.model(guildName, schema);
	
	// initial model and stringify values of each property
	let createdAt = new Date().toLocaleString();
	let model = { createdAt };
	Object.keys(data).forEach((key) => {
		model[key] = JSON.stringify(data[key]);
	});

	let document = new Model(model);
	// save to db
	document.save((err) => {
		if (err) {
			console.error(err);
		}
	})
}