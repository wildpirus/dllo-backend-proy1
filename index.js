const express = require('express');
const cors = require('cors')
const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

const app = express();

app.use(express.json());
/*const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));*/
app.use(cors());

/*
los nombres de tus bases de datos y clusters
deben ser los mismos en el servicio de Atlas y
en tu código.
*/

/*
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(
    )
.then(() => {
    console.log("Exito");
})
.catch((e) => {
    console.log(e)
    console.log("Jumbo")
})
*/

app.get('/', (req,res) => {
  res.status(200).json({});
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Deployed");
});
