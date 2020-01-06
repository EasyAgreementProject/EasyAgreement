var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";

class externalTutor {

    constructor (){
        this.email        = null;
        this.password     = null;
        this.surname      = null;
        this.name         = null;
        this.organization = null;
    }

    //Getter Methods
    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    getName(){
        return this.name;
    }

    getSurname(){
        return this.surname;
    }

    getOrganization(){
        return this.organization;
    }

    //Setter Methods
    setEmail(email){
        this.email = email;
    }

    setPassword(password){
        this.password = password;
    }

    setName(name){
        this.name = name;
    }

    setSurname(surname){
        this.surname = surname;
    }

    setOrganization(organization){
        this.organization = organization;
    }

static insertExternalTutor(externaltutor) {
    return new Promise(function (fulfill, reject) {
        MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
            if(err) throw err;
            console.log("Connected successfully to server!");
            var dbo = db.db(dbName);
            dbo.collection("ExternalTutor").insertOne(externaltutor, function(err) {
                if(err) throw err;
                console.log("External Tutor inserted correctly!");
                fulfill();
                db.close();
            });
        });
    });
}

/**
 * Find external tutor by email
 * @param {String} email- email of tutor
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
static findByEmail(email){
    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            dbo.collection("ExternalTutor").findOne({"E_mail": email}, function(err, result){
                if(err) reject(err);
                if(result!=null){
                    var extutor= new externalTutor();
                    extutor.setEmail(result.E_mail);
                    extutor.setPassword(result.Password);
                    extutor.setSurname(result.Surname);
                    extutor.setName(result.Name);
                    extutor.setOrganization(result.Organization);
                    fulfill(extutor);
                }
                else{
                    fulfill(null);
                }
                db.close();
            })
        });
    });
}
static updateExternalTutor(externaltutor,emailv) {
    return new Promise(function (fulfill, reject) {
        MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
            if(err) throw err;
            console.log("Connected successfully to server!");
            var dbo = db.db(dbName);
            console.log(".");
            var myquery = { E_mail: emailv };
            var newvalues={};
            if(externaltutor.name    != null) newvalues.Name=externaltutor.name;
            if(externaltutor.surname != null) newvalues.Surname=externaltutor.surname;
            if(externaltutor.organization != null) newvalues.Organization=externaltutor.organization;
            
             dbo.collection("ExternalTutor").updateOne(myquery, {$set: newvalues }, function(err, res) {
                 if (err) throw err;
                     console.log("1 document updated");
             });
             dbo.collection("ExternalTutor").findOne({"E_mail": emailv}, function(err, result){
                if(err) reject(err);
                if(result!=null){
                    var extutor= new externalTutor();
                    extutor.setEmail(result.E_mail);
                    extutor.setPassword(result.Password);
                    extutor.setSurname(result.Surname);
                    extutor.setName(result.Name);
                    extutor.setOrganization(result.Organization);
                    fulfill(extutor);
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
 * Retrieve all excternal tutor
 * 
 * @returns {promise} - return promise
 */
static RetrieveAll() {
    return new Promise(function(fulfill,reject){
        MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, function(err, db){
            if(err)  reject(err);
            var dbo= db.db(dbName);
            dbo.collection("ExternalTutor").find({}).toArray(function(err,result) {
                if(err) throw err;
                fulfill(result);
                db.close();
            });
        });
    });
}
static updatePassword(password,emailv) {
    return new Promise(function (fulfill, reject) {
        MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
            if(err) reject(err);
            console.log("Connected successfully to server!");
            var dbo = db.db(dbName);
            console.log(".");
            var myquery = { E_mail: emailv };
            var newvalues = { $set: {Password:password } };
             dbo.collection("ExternalTutor").updateOne(myquery, newvalues, function(err, res) {
                 if (err) reject(err);
             });
             dbo.collection("ExternalTutor").findOne({E_mail: emailv}, function(err, result){
                if(err) reject(err);
                if(result!=null){
                    var externaltutor= new externalTutor();
                    externaltutor.setName(result.Name);
                    externaltutor.setSurname(result.Surname);
                    externaltutor.setOrganization(result.Organization);
                    externaltutor.setEmail(result.E_mail);
                    externaltutor.setPassword(result.Password);

                   
                    db.close();
                    fulfill(externalTutor);
                }
                else{
                    db.close();
                    fulfill(null);
                }
             })
            });
        });
    }
    
}
module.exports= externalTutor;