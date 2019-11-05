module.exports = (app, db) => {
    
    app.post("/add", (req, res) => {
        console.log('/')
        console.log(req.body);
        const note = { name: req.body.name, email:req.body.email, age: req.body.age, height: req.body.height,Weight: req.body.Weight,password:req.body.password };
        db.collection('UserData').insertOne(note, (err, result) => {
            if (err)
                console.log(err + " this error has occured");
            else
                console.log(result);

        });
         res.status(200).send('Bon Jour');
    });

    // app.post("/", (req, res) => {
    //     const note = { email: req.body.email, password: req.body.password };
    //     //console.log(req.body);
    //     db.collection('UserData').findOne({name:req.body.name,password: req.body.password},(err,result) => {
    //         if (result==null)
    //         {
    //            console.log("Fail");
    //            //res.status(400).send('err');
    //         }
    //        else
    //        {
    //           console.log("success");
    //           res.status(200).send('result');
    //        }
    //     });
    // });


        app.get("/", (req, res) => {

            db.collection('FoodData').find({}).toArray(function (err, result) {
                if (err)
                    console.log(err + " this error has occured");
                else {
                     res.status(200).send(result);
                     //console.log(data);
                }
            });
        });
    
}
