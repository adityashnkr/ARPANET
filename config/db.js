const mongoose = require('mongoose');
const config = require('config');
const db = process.env.atlasUri;

const connectDB = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(db);
		console.log('MongoDB Connected!');
	} catch (err) {
		console.log(err.message);
		//Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
