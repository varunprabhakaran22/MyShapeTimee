const express = require('express');
const mongo = require('mongodb').MongoClient;
const db = require('./config/config');
const port = 8000;
const app = express();
const body=require('body-parser');
const cors=require('cors');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(body());
app.use(cors());

mongo.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err)
        return console.log(err);
    const database = db.db("UserData")
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('connected to db');
    });
})



app.use(body.urlencoded({ extended: false }));
app.use(body.json());


// app.use("/weight", require("./route"));

// // app.use('/menu',require('./routemenu'));app.listen(3000, () => {
//  console.log("Your port");
// });app.get("/", (req, res) => {
//  res.send("Hey Varun");
// });// module.exports(app)