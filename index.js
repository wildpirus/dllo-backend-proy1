const express = require('express');
const routerApi = require('./routes')

const app = express();

app.use(express.json());

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

app.listen(3000, () => {
  console.log("Deployed");
});
