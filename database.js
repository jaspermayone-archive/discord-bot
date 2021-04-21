const mongoose = require('mongoose');
const { MongoDB } = require('./config.json');

function connectToDb() {
	mongoose.connect((MongoDB), {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		autoIndex: false
	}).then(() => {
		console.log('Connected to Heptagram MongoDB database!')
	}).catch((err) => {
		console.log(err);
	});
}

module.exports = { connectToDb };