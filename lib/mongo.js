const db = require('mongoose');
const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

db.Promise = global.Promise;
db.connect(MONGO_URI,{
  useNewUrlParser: true
}).then(() => {
    console.log("DB Connected!");
})
.catch((e) => {
    console.log(e)
    console.log("Jumbo")
})

module.exports = db;
