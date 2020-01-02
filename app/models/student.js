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
       this.StudentID        = null;
       this.DegreeCourse     = null;
       this.Address          = null;
       this.City             = null;
       this.Email            = null;
       this.Surname          = null;
       this.Name             = null;
       this.CV               = null;
       this.IDCard           = null;
       this.Password         = null;
    }

    /**
     * Get StudentID
     * @returns {String}- return StudentID
     */
    getStudentId(){
        return this.StudentID;
    }

    /**
     * Get Name
     * @returns {String}- return name
     */
    getName(){
        return this.Name;
    }

    /**
     * Get surname
     * @returns {String} - return surname
     */
    getSurname(){
        return this.Surname;
    }

    /**
     * Get password
     * @returns {Object}- return password
     */
    getPassword(){
        return this.Password;
    }

    /**
     * Get email
     * @returns {String} - return email
     */
    getEmail(){
        return this.Email;
    }

    /**
     * Get city
     * @returns {String}-  return city
     */
    getCity(){
        return this.City;
    }

    /**
     * Get Degree Course
     * @returns {string} - return degree course
     */
    getDegreeCourse(){
        return this.DegreeCourse;
    }

    /**
     * Get Identity cart
     * @returns {File} - return identity cart
     */
    getIdentityCard(){
        return this.IDCard;
    }

    /**
     * Get Curriculum Vitae
     * @returns {File} - return Curriculum vitae
     */
    getCurriculumVitae(){
        return this.CV;
    }

    /**
     * Get address
     * @returns {String} - return address
     */
    getAddress(){
        return this.Address;
    }

    /**
     * Set name
     * @param {String} name - name
     */
    setName(name){
        this.Name = name;
    }

    /**
     * Set surname
     * @param {String} surname - surname
     */
    setSurname(surname){
        this.Surname = surname;
    }

    /**
     * Set password
     * @param {Object} password - password
     */
    setPassword(password){
        this.Password = password;
    }

    /**
     * Set email
     * @param {String} email - email
     */
    setEmail(email){
        this.Email = email;
    }

    /**
     * Set city
     * @param {String} city - city
     */
    setCity(city){
        this.City = city;
    }

    /**
     * Set degree course
     * @param {String} degree_course - degree course
     */
    setDegreeCourse(degree_course){
        this.DegreeCourse = degree_course;
    }

    /**
     * Set identity card
     * @param {File} identity_card - identity card
     */
    setIdentityCard(identity_card){
        this.IDCard = identity_card;
    }

    /**
     * Set curriculum vitae
     * @param {File} curriculum_vitae - curriculum vitae
     */
    setCurriculumVitae(curriculum_vitae){
        this.CV = curriculum_vitae;
    }

    /**
     * Set address
     * @param {String} address - address
     */
    setAddress(address){
        this.Address = address;
    }

    /**
     * Set studentID
     * @param {String} studentID - studentID
     */
    setStudentID(studentID){
        this.StudentID= studentID;
    }

/**
 * Insert student in database
 * @param {Object} student - student object
 * @returns {Promise} - return promise
 */
static insertStudent(student) {
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
static findByMatricola(studentID){
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
                db.close;

            });
        });
    });
}

/**
 * Find student by email
 * @param {String} email- email
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
static findExistByEmail(email){
    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            dbo.collection("Student").findOne({"Email": email}, function(err, result){
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
 * check if exist student by email
 * @param {String} email- email
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
static findByEmail(email){
    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            dbo.collection("Student").findOne({"Email": email}, function(err, result){
                if(err) reject(err);
                if(result!=null){
                    var student= new Student();
                    student.setName(result.Name);
                    student.setSurname(result.Surname);
                    student.setDegreeCourse(result.DegreeCourse);
                    student.setAddress(result.Address);
                    student.setCity(result.City);
                    student.setEmail(result.Email);
                    student.setCurriculumVitae(result.CV);
                    student.setIdentityCard(result.IDCard);
                    student.setPassword(result.Password);
                    student.setStudentID(result.StudentID);
                    fulfill(student);
                }
                else{
                    fulfill(null);
                }
                db.close();
            })
        });
    });
}

static checkCVPresence(email) {   //Check if a CV in pdf format is present in selected student.
                                  //Search is performed by using email as func argument.

    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            dbo.collection("Student").findOne({"Email": email}, function(err, result){
                if(err) reject(err);
                if(result!=null && student.CV != null){
                    
                    fulfill(true);
                    
                }
                else{
                    fulfill(false);
                }
                db.close();
            })
        });
    });

    }



static checkIDPresence(email) {   //Check if a ID in pdf or jpeg format is present in selected student.
                                  //Search is performed by using email as func argument.

    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            dbo.collection("Student").findOne({"Email": email}, function(err, result){
                if(err) reject(err);
                if(result!=null && student.IDCard != null){
                    
                    fulfill(true);
                    
                }
                else{

                    fulfill(false);
                }
                db.close();
                })
            });
        });

    }


static updateStudentCV(email, ObjectCV) {   //Insert/update student CV
       

    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            
                dbo.collection("Student").findOne({"Email": email}, function(err, result){
                if(err) reject(err);
                dbo.collection("Student").updateOne(
                    {"email" : result.email},
                    {$set:{"CV" : ObjectCV }})
                fulfill(true);
                db.close();
                })
            });
        });

    }


    static updateStudentID(email, ObjectID) {   //Insert/update student ID
       

        return new Promise(function(fulfill,reject){
            MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
                if(err)  reject(err);
                var dbo= db.db(dbName);
                
                    dbo.collection("Student").findOne({"Email": email}, function(err, result){
                    if(err) reject(err);
                    dbo.collection("Student").updateOne(
                        {"email" : result.email},
                        {$set:{"IDCard" : ObjectID }})
                    fulfill(true);
                    db.close();
                    })
                });
            });
    
        }

        static retrieveStudentCV(email) {   //Insert/update student ID
       

            return new Promise(function(fulfill,reject){
                MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
                    if(err)  reject(err);
                    var dbo= db.db(dbName);
                    
                        dbo.collection("Student").findOne({"Email": email}, function(err, result){
                        if(err) reject(err);
                        //code here
                        fulfill(result);
                        db.close();
                        })
                    });
                });
        
            }



static retrieveStudentID(email) {   //Insert/update student ID
    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            
                dbo.collection("Student").findOne({"Email": email}, function(err, result){
                if(err) reject(err);
                //code here
                fulfill(result);
                db.close();
                })
            });
        });

    }

/**
 * Retrieve all students
 *
 * @returns {promise} - return promise
 */
static RetrieveAll() {
    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            
            dbo.collection("Student").find({}).toArray(function(err,result) {
                if(err) throw err;
                fulfill(result);
                db.close();
            });
        });
    });
    }

    static deleteStudentCV(email) {   //Delete student CV
       

        return new Promise(function(fulfill,reject){
            MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
                if(err)  reject(err);
                var dbo= db.db(dbName);
                
                    dbo.collection("Student").findOne({"Email": email}, function(err, result){
                    if(err) reject(err);
                    dbo.collection("Student").updateOne(
                        {"email" : result.email},
                        {$set:{"CV" : null }})
                    fulfill(true);
                    db.close();
                    })
                });
            });
    
        }


        static deleteStudentID(email) {   //Delete student ID
       

            return new Promise(function(fulfill,reject){
                MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
                    if(err)  reject(err);
                    var dbo= db.db(dbName);
                    
                        dbo.collection("Student").findOne({"Email": email}, function(err, result){
                        if(err) reject(err);
                        dbo.collection("Student").updateOne(
                            {"email" : result.email},
                            {$set:{"IDCard" : null }})
                        fulfill(true);
                        db.close();
                        })
                    });
                });
        
            }



}


module.exports= Student;
