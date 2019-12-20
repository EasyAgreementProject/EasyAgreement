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
        this.email=null;
        this.password=null;
        this.surname=null;
        this.name=null;
        this.department=null;
    }
    
    /**
     * Get email
     * @returns {string}- return email
     */
    getEmail() {
        return this.email;
    }

    /**
     * Get password
     * @returns {Object}- return password
     */
    getPassword() {
        return this.password;
    }

    /**
     * Get surname
     * @returns {String}- return surname
     */
    getSurname() {
        return this.surname;
    }

    /**
     * Get Name
     * @returns {String}- return name
     */
    getName(){
        return this.name;
    }

    /**
     * Get Department
     * @returns {String}- return department
     */
    getDepartment() {
        return this.department;
    }
    
    /**
     * Set email
     * @param {String} email- email
     */
    setEmail(email) {
        this.email=email;
    }

    /**
     * Set password
     * @param {Object} password- password
     */
    setPassword(password) {
        this.password=password;
    }

    /**
     * Set surname
     * @param {String} surname - surname
     */
    setSurname(surname) {
        this.surname=surname;
    }
    
    /**
     * Set name
     * @param {String} name - name
     */
    setName(name) {
        this.name=name;
    }
    
    /**
     * Set department
     * @param {String} department - department
     */
    setDepartment(department){
        this.department=department;
    }
}
    
/**
 * Insert academic tutor
 * @param {Object} AcademicTutor- object of academic tutor
 * @returns {Promise} - return a promise
 */
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

/**
 * Find academic tutor by email
 * @param {String} email- email of tutor
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
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