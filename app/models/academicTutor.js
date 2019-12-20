var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";

class AcademicTutor {
    constructor(){
        this.email=null;
        this.password=null;
        this.surname=null;
        this.name=null;
        this.department=null;
    }
    //getter methods
    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getSurname() {
        return this.surname;
    }

    getName(){
        return this.name;
    }

    getDepartment() {
        return this.department;
    }
    
    //setter methods
    setEmail(email) {
        this.email=email;
    }

    setPassword(password) {
        this.password=password;
    }

    setSurname(surname) {
        this.surname=surname;
    }
    
    setName(name) {
        this.name=name;
    }
    
    setDepartment(department){
        this.department=department;
    }
}
    
exports.insertAcademicTutor = function(AcademicTutor) {
    return new Promise(function (fulfill, reject) {
        MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
            if(err) throw err;
            console.log("Connected successfully to server!");
            var dbo = db.db(dbName);
            dbo.collection("AcademicTutor").insertOne(AcademicTutor, function(err) {
                if(err) throw err;
                console.log("Academic Tutor inserted correctly!");
                fulfill();
                db.close();
            });
        });
    });
}

exports.findByEmail= function(email){
    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            dbo.collection("AcademicTutor").findOne({"E_mail": email}, function(err, result){
                if(err) reject(err);
                if(Boolean(result)){
                    fulfill(false);
                }
                else{
                    fulfill(true);
                }
                db.close();
            })
        });
    });
}