module.exports = (app, db) => {
    app.post("/add", (req, res) => {
        console.log('/')
        console.log(req.body);
        const note = { name: req.body.name, age: req.body.age, height: req.body.height,Weight: req.body.Weight };
        db.collection('UserData').insertOne(note, (err, result) => {
            if (err)
                console.log(err + " this error has occured");
            else
                console.log(result);

        });
        res.status(200).send('Bon Jour');
    });

    app.post("/signup", (req, res) => {
        console.log('/')
        console.log(req.body);
        const note = { name: req.body.name, password: req.body.password };
        db.collection('UserCredentials').insertOne(note, (err, result) => {
            if (err)
                console.log(err + " this error has occured");
            else
                console.log(result);

        });
        res.status(200).send('Bon Jour');
    });

    app.post("/", (req, res) => {
        const note = { name: req.body.name, password: req.body.password };
        //console.log(req.body);
        let val=db.collection('UserCredentials').findOne({name:req.body.name,password:req.body.password})
            if (!(val))
            {
                console.log(val + " this error has occured");
                
            }
            else
            {
                console.log("Error");
            }
        });
}
