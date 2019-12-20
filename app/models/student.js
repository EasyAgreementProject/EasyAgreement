var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";

class Student {
    /**
     * Constructor of Student
     * @constructor
     */
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

    /**
     * Get StudentID
     * @returns {String}- return StudentID
     */
    getStudentId(){
        return this.studentID;
    }

    /**
     * Get Name
     * @returns {String}- return name
     */
    getName(){
        return this.name;
    }

    /**
     * Get surname
     * @returns {String} - return surname
     */
    getSurname(){
        return this.surname;
    }

    /**
     * Get password
     * @returns {Object}- return password
     */
    getPassword(){
        return this.password;
    }

    /**
     * Get email
     * @returns {String} - return email
     */
    getEmail(){
        return this.email;
    }

    /**
     * Get city
     * @returns {String}-  return city
     */
    getCity(){
        return this.city;
    }

    /**
     * Get Degree Course
     * @returns {string} - return degree course
     */
    getDegreeCourse(){
        return this.degree_course;
    }
    
    /**
     * Get Identity cart
     * @returns {File} - return identity cart
     */
    getIdentityCard(){
        return this.identity_card;
    }

    /**
     * Get Curriculum Vitae
     * @returns {File} - return Curriculum vitae
     */
    getCurriculumVitae(){
        return this.curriculum_vitae;
    }

    /**
     * Get address
     * @returns {String} - return address
     */
    getAddress(){
        return this.address;
    }

    /**
     * Set name
     * @param {String} name - name
     */
    setName(name){
        this.name = name;
    }

    /**
     * Set surname
     * @param {String} surname - surname
     */
    setSurname(surname){
        this.surname = surname;
    }

    /**
     * Set password
     * @param {Object} password - password
     */
    setPassword(password){
        this.password = password;
    }

    /**
     * Set email
     * @param {String} email - email
     */
    setEmail(email){
        this.email = email;
    }

    /**
     * Set city
     * @param {String} city - city
     */
    setCity(city){
        this.city = city;
    }

    /**
     * Set degree course
     * @param {String} degree_course - degree course
     */
    setDegreeCourse(degree_course){
        this.degree_course = degree_course;
    }

    /**
     * Set identity card
     * @param {File} identity_card - identity card
     */
    setIdentityCard(identity_card){
        this.identity_card = identity_card;
    }

    /**
     * Set curriculum vitae
     * @param {File} curriculum_vitae - curriculum vitae
     */
    setCurriculumVitae(curriculum_vitae){
        this.curriculum_vitae = curriculum_vitae;
    }

    /**
     * Set address
     * @param {String} address - address
     */
    setAddress(address){
        this.address = address;
    }
}

/**
 * Insert student in database
 * @param {Object} student - student object
 * @returns {Promise} - return promise
 */
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

/**
 * Find student by StudentID
 * @param {String} studentID- studentID
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
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