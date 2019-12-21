var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";

class Administrator{
    //Constructor
    constructor (){
        this.name     = null;
        this.surname  = null;
        this.password = null;
        this.email    = null;
    }

    //Getter Methods
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
            dbo.collection("Administrator").findOne({"email": email}, function(err, result){
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