const mongoose = require('mongoose');
const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;

async function connect() {
  await mongoose.connect(MONGO_URI,{
    useNewUrlParser: true
  }).then(() => {
      console.log("DB Connected!");
  }).catch((e) => {
      console.log(e);
  });
}

module.exports = connect;

/*
class MongoLib {
  constructor() {
    this.client = mongoose;
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(MONGO_URI,{
          useNewUrlParser: true
        }).then(() => {
          resolve(this.client);
          console.log("DB Connected!");
        })
        .catch((err) => {
          reject(err)
        })
      });
    }
    return MongoLib.connection;
  }
}

module.exports = MongoLib;
*/
