var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";

MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
   
    if(err) throw err;
    console.log("Connected successfully to server!");
    var dbo= db.db(dbName);

    dbo.collection("Student").deleteMany({}, function(err,result) {

        if(err) throw err;
    console.log("Succesfully deleted "+result.deletedCount+" students");

    });

    dbo.collection("HostOrganization").deleteMany({}, function(err,result) {

        if(err) throw err;
        console.log("Succesfully deleted "+result.deletedCount+" host organizations");
    
        });
    
        dbo.collection("Administrator").deleteMany({}, function(err,result) {

            if(err) throw err;
            console.log("Succesfully deleted "+result.deletedCount+" administrators");
        
            });

            dbo.collection("ExternalTutor").deleteMany({}, function(err,result) {

                if(err) throw err;
                console.log("Succesfully deleted "+result.deletedCount+" external tutors");
            
                });

                dbo.collection("AcademicTutor").deleteMany({}, function(err,result) {

                    if(err) throw err;
                    console.log("Succesfully deleted "+result.deletedCount+" academic tutors");
                
                    });



});