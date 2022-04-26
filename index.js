const express = require('express');
const routerApi = require('./routes')

const app = express();


/*
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(
    "mongodb+srv://capacho:marlene@cluster0.oqd26.mongodb.net/test-db?retryWrites=true&w=majority"
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
