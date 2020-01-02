var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";


class AcademicTutor {
    /**
     * Academic Tutor Class Model
     * @constructor
     */
    constructor(){
        this.E_mail=null;
        this.Password=null;
        this.Surname=null;
        this.Name=null;
        this.Department=null;
    }
    
    /**
     * Get email
     * @returns {string}- return email
     */
    getEmail() {
        return this.E_mail;
    }

    /**
     * Get password
     * @returns {Object}- return password
     */
    getPassword() {
        return this.Password;
    }

    /**
     * Get surname
     * @returns {String}- return surname
     */
    getSurname() {
        return this.Surname;
    }

    /**
     * Get Name
     * @returns {String}- return name
     */
    getName(){
        return this.Name;
    }

    /**
     * Get Department
     * @returns {String}- return department
     */
    getDepartment() {
        return this.Department;
    }
    
    /**
     * Set email
     * @param {String} email- email
     */
    setEmail(email) {
        this.E_mail=email;
    }

    /**
     * Set password
     * @param {Object} password- password
     */
    setPassword(password) {
        this.Password=password;
    }

    /**
     * Set surname
     * @param {String} surname - surname
     */
    setSurname(surname) {
        this.Surname=surname;
    }
    
    /**
     * Set name
     * @param {String} name - name
     */
    setName(name) {
        this.Name=name;
    }
    
    /**
     * Set department
     * @param {String} department - department
     */
    setDepartment(department){
        this.Department=department;
    }
    
/**
 * Insert academic tutor
 * @param {Object} AcademicTutor- object of academic tutor
 * @returns {Promise} - return a promise
 */
static insertAcademicTutor(AcademicTutor) {
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

/**
 * Find academic tutor by email
 * @param {String} email- email of tutor
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
static findByEmail(email){
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

/**
 * Retrieve academic tutor by email
 * @param {String} email- email of tutor
 * @returns {Object} - return academic tutor if exist, else null
 */
static RetrieveByEmail(email){
    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            dbo.collection("AcademicTutor").findOne({"E_mail": email}, function(err, result){
                if(err) reject(err);
                if(result!=null){
                    var academicTutor= new AcademicTutor();
                    academicTutor.setName(result.Name);
                    academicTutor.setSurname(result.Surname);
                    academicTutor.setEmail(result.E_mail);
                    academicTutor.setDepartment(result.Department);
                    academicTutor.setPassword(result.Password);
                    fulfill(academicTutor);
                }
                else{
                    fulfill(null);
                }
                db.close();
            })
        });
    });
}
<<<<<<< HEAD
=======

/**
 * Retrieve all accademic tutor
 * 
 * @returns {promise} - return promise
 */
static RetrieveAll() {
    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            dbo.collection("AcademicTutor").find({}).toArray(function(err,result) {
                if(err) reject(err);
                fulfill(result);
                db.close();
            });
        });
    });
}
}
>>>>>>> 00c8e09d5665fecb7fcc2e5d44d99eb05519ac69

static updateAcademicTutor(academicTutor,emailv) {
    return new Promise(function (fulfill, reject) {
        MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
            if(err) throw err;
            console.log("Connected successfully to server!");
            var dbo = db.db(dbName);
            console.log(".");
            var myquery = { E_mail: emailv };
            var newvalues = { $set: {Name: academicTutor.Name, Surname: academicTutor.Surname, Department: academicTutor.Department} };
             dbo.collection("AcademicTutor").updateOne(myquery, newvalues, function(err, res) {
                 if (err) throw err;
                     console.log("1 document updated"+ academicTutor.Name + academicTutor.Surname+ academicTutor.Department);
                db.close();
             });
            });
        });
    
}
}
module.exports= AcademicTutor;
