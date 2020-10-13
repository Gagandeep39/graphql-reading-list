/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-13 22:33:48
 * @modify date 2020-10-13 22:33:48
 * @desc Databnase connection
 */
const mongoose = require('mongoose');
const keys = require('../config/keys');
const dbUri = keys.mongoURI;

// Async FUnction to Connect to Database
const connectDB = async () => {
  await mongoose
    .connect(dbUri, {
      // Fix Deperication Errors
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // (node:17188) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
      useCreateIndex: true,
    })
    .then((res) => {
      console.log('MOngo DB Connected...');
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
};
module.exports = connectDB;
