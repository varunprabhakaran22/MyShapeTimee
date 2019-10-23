module.exports = (app, db) => {
    app.post("/", (req, res) => {
        console.log('/')
        const note = { text: req.body.text, title: req.body.title };
        db.collection('UserData').insert(note, (err, result) => {
            if (err)
                console.log(err + " this error has occured");
            else
                console.log(result);

        });
        res.status(200).send('Bon Jour');
    });

    // app.get("/", (req, res) => {

    //     db.collection('QueSet').find({}).toArray(function (err, result) {
    //         if (err)
    //             console.log(err + " this error has occured");
    //         else {
    //              res.status(200).send(result);
    //         }
    //     });
    // });


};
