var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";

class Student {
    //Constructor
    constructor() {
       this.studentID        = null;
       this.name             = null;
       this.surname          = null;
       this.password         = null;
       this.email            = null;
       this.city             = null;
       this.degree_course    = null;
       this.identity_card    = null;
       this.curriculum_vitae = null;
       this.address          = null;
    }
    //Getter Methods
    getStudentId(){
        return this.studentID;
    }

    getName(){
        return this.name;
    }

    getSurname(){
        return this.surname;
    }

    getPassword(){
        return this.password;
    }

    getEmail(){
        return this.email;
    }

    getCity(){
        return this.city;
    }

    getDegreeCourse(){
        return this.degree_course;
    }
    
    getIdentityCard(){
        return this.identity_card;
    }

    getCurriculumVitae(){
        return this.curriculum_vitae;
    }

    getAddress(){
        return this.address;
    }

    //Setter Methods
    setName(name){
        this.name = name;
    }

    setSurname(surname){
        this.surname = surname;
    }

    setPassword(password){
        this.password = password;
    }

    setEmail(email){
        this.email = email;
    }

    setCity(city){
        this.city = city;
    }

    setDegreeCourse(degree_course){
        this.degree_course = degree_course;
    }

    setIdentityCard(identity_card){
        this.identity_card = identity_card;
    }

    setCurriculumVitae(curriculum_vitae){
        this.curriculum_vitae = curriculum_vitae;
    }

    setAddress(address){
        this.address = address;
    }
}
exports.insertStudent = function(student) {
    return new Promise(function (fulfill, reject) {
        MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
            if(err) throw err;
            console.log("Connected successfully to server!");
            var dbo = db.db(dbName);
            dbo.collection("Student").insertOne(student, function(err) {
                if(err) throw err;
                console.log("Student inserted correctly!");
                fulfill();
                db.close();
            });
        });
    });
}

exports.findByMatricola= function(studentID){
    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            dbo.collection("Student").findOne({"StudentID": studentID}, function(err, result){
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