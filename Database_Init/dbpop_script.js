var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";

MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
   
    if(err) throw err;
    console.log("Connected successfully to server!");
    var dbo= db.db(dbName);

    
    const fs = require('fs');
        let studentData = fs.readFileSync('Database_Init/JSON/dbpop_student.json');
        let adminData = fs.readFileSync('Database_Init/JSON/dbpop_admin.json');
        let actutorData = fs.readFileSync('Database_Init/JSON/dbpop_actutor.json');
        let extTutorData = fs.readFileSync('Database_Init/JSON/dbpop_exttutor.json');
        let hostOrgData = fs.readFileSync('Database_Init/JSON/dbpop_hostorg.json');



        let students = JSON.parse(studentData);
        let admin = JSON.parse(adminData);
        let actutor = JSON.parse(actutorData);
        let exttutor = JSON.parse(extTutorData);
        let hostorg = JSON.parse(hostOrgData);
        dbo.collection("Student").insertMany(students,function(err, result) {

            if(err) throw err;
            console.log("Succesfully inserted into database "+result.insertedCount+" students");

        });

        dbo.collection("Administrator").insertMany(admin,function(err, result) {

            if(err) throw err;
            console.log("Succesfully inserted into database "+result.insertedCount+" admins");

        });

        dbo.collection("AcademicTutor").insertMany(actutor,function(err, result) {

            if(err) throw err;
            console.log("Succesfully inserted into database "+result.insertedCount+" academic tutors");

        });

        dbo.collection("ExternalTutor").insertMany(exttutor,function(err, result) {

            if(err) throw err;
            console.log("Succesfully inserted into database "+result.insertedCount+" external tutors");

        });

        dbo.collection("HostOrganization").insertMany(hostorg,function(err, result) {

            if(err) throw err;
            console.log("Succesfully inserted into database "+result.insertedCount+" host organizations");

        });



    




});