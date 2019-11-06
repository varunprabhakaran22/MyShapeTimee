let userData;


module.exports = (app, db) => {
    
    app.post("/add", (req, res) => {
        console.log(req.body);
        const note = { name: req.body.name, email:req.body.email, age: req.body.age, height: req.body.height,Weight: req.body.Weight,DesiredWeight : req.body.DesiredWeight,password:req.body.password };
    
        db.collection('UserData').findOne({email: req.body.email}).then(function(result){
            if(!(result==null)){
                res.status(200).json({msg:"Email Id already present"});
            }
            else
            {
                db.collection('UserData').insertOne(note, (err, result) => {
                    if (err)
                    {
                        console.log(err + " this error has occured");
                    }
                    else
                    {
    
                         res.status(200).json({msg:"success"});
                    }
                });
             }
       });
    });

    app.post("/", (req, res) => {
        const note = { email: req.body.email, password: req.body.password };
        //console.log(req.body);
        db.collection('UserData').findOne({email: req.body.email, password: req.body.password}).then(function(result){
            if(!(result==null)){
            
                db.collection('UserData').findOne(note, (err, result) => {
                    if (err)
                    {
                        console.log(err + " this error has occured");
                        
                    }
                    else
                    {
                        console.log(result);
                        userData=result;
                        res.status(200).json({msg:"User Exist"});
                        test();
                    }
                });
            
            }
           else
           {
              res.status(200).json({msg:"User Does Not Exist"});
           }
        });
    });

    
 }
function test()
{
    console.log(userData.name);
}