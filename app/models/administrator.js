var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";

class Administrator{
    /**
     * Constructor of administrator
     * @constructor
     */
    constructor (){
        this.name     = null;
        this.surname  = null;
        this.password = null;
        this.email    = null;
    }

    /**
     * Get name
     * @returns {String} - return name
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
     * @returns {Object} - return password
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
 * Find administrator by email
 * @param {String} email- email of tutor
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
static findByEmail(email){
    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            dbo.collection("Administrator").findOne({email: email}, function(err, result){
                if(err) reject(err);
                if(result!=null){
                    var admin= new Administrator();
                    admin.setEmail(result.email);
                    admin.setName(result.name);
                    admin.setSurname(result.surname);
                    admin.setPassword(result.Password);
                    fulfill(admin);
                }
                else{
                    fulfill(null);
                }
                db.close();
            })
        });
    });
}


/**
 * update password of administrator
 * @param {String} pass - Administrator's password
 * @param {String} emailv - Administrator's email
 * @returns {Object} - Returns the updated password of administrator if result != null, else it returns null
 * 
 */

static updatePassword(pass,emailv) {
    return new Promise(function (fulfill, reject) {
        MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
            if(err) reject(err);
            console.log("Connected successfully to server!");
            var dbo = db.db(dbName);
            console.log(".");
            var myquery = { email: emailv };
            var newvalues = { $set: {Password: pass } };
             dbo.collection("Administrator").updateOne(myquery, newvalues, function(err, res) {
                 if (err) reject(err);
                     console.log("1 document updated");
             });
             dbo.collection("Administrator").findOne({email: emailv}, function(err, result){
                if(err) reject(err);
                if(result!=null){
                    var admin= new Administrator();
                    admin.setEmail(result.email);
                    admin.setName(result.name);
                    admin.setSurname(result.surname);
                    admin.setPassword(result.password);
                    fulfill(admin);
                }
                else{
                    fulfill(null);
                }
                db.close();
            })
            });
        });
    
}
}

module.exports= Administrator;