var hash=require('./hash.js');
var studentModel= require('../models/student.js');
var academicTutorModel= require('../models/academicTutor.js');
var externalTutorModel= require('../models/externaltutor.js');
var administratorModel= require('../models/administrator.js');

exports.login= function(req, res){
    
        //take form parameters
        var username= req.body.username;
        var password= req.body.password;
       

        //form validation
        var isRight=true;
        if((username==null) || (username.length<=1) || (!/^[a-z].[a-z]+[1-9]*@studenti.unisa.it/.test(username))){
            if(!/^[a-z].[a-z]+[1-9]*@unisa.it/.test(username)){
                if(!/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9]){1,}?/.test(username)){
                    res.cookie('errUsername','1');
                    isRight=false;
                }
            }
        }

        
        if((password==null) || (password.length<=7) || (!new RegExp("^[A-Za-z0-9\s]+$").test(password))){
            res.cookie('errPassword','1');
            isRight=false;
        }

        if(!isRight){
            res.redirect('/');
            return;
        }
        

        var checkStudent=studentModel.findByEmail(username);

        
         /** 
          * Check the student's email with the emails in the database. If the email is not founded generete a cookie error, else
          * check the password
          * @param {result} resultS - The result of the findByEmail function (about student)
          * @param {result} resultA - The result of the findByEmail function (about academic tutor)
          * @param {result} resultE - The result of the findByEmail function (about external tutor)
          * @param {result} resultAd- The result of the findByEmail function (about administrator
          */
        checkStudent.then(function(resultS){
            if(resultS==null){
                var checkAcademic=academicTutorModel.RetrieveByEmail(username);
                checkAcademic.then(function(resultA){
                    if(resultA==null){
                        var checkExternal=externalTutorModel.findByEmail(username);
                        checkExternal.then(function(resultE){
                            if(resultE==null){
                                var checkAdmin= administratorModel.findByEmail(username);
                                checkAdmin.then(function(resultAd){
                                    if(resultAd==null){
                                        res.cookie('errLogin','1');
                                        res.redirect('/');
                                        return;
                                    }
                                    else{
                                       if(hash.checkPassword(resultAd.getPassword().hash, resultAd.getPassword().salt, password)){
                                           
                                            var adminSession={
                                                utente: resultAd,
                                                type: "admin"
                                           
                                            };
                                            req.session.utente=adminSession;
                                            
                                            
                                            redirect(res);
                                        }
                                        else{
                                            res.cookie('errLogin','1');
                                            res.redirect('/');
                                            return;
                                        }
                                    }
                                })
                            }
                            else{
                                if(hash.checkPassword(resultE.getPassword().hash, resultE.getPassword().salt, password)){
                                  
                                   var externalSession={
                                        utente: resultE,
                                        type: "externalTutor"
                                    };
                                    req.session.utente=externalSession;
                                
                                    redirect(res);
                                }
                                else{
                                    res.cookie('errLogin','1');
                                    res.redirect('/');
                                    return;
                                }
                            }
                        })
                    }
                    else{
                       if(hash.checkPassword(resultA.getPassword().hash, resultA.getPassword().salt, password)){
                            var academicSession={
                                utente: resultA,
                                type: "academicTutor"
                            };
                            req.session.utente=academicSession;
                           

                            redirect(res);
                        }
                        else{
                            res.cookie('errLogin','1');
                            res.redirect('/');
                            return;
                        }
                    }
                })
            }
            else{
               if(hash.checkPassword(resultS.getPassword().hash, resultS.getPassword().salt, password)){
                    var studentSession={
                        utente: resultS,
                        type: "student"
                    };
                    req.session.utente=studentSession;
                    
                    redirect(res);
                }
                else{
                    res.cookie('errLogin','1');
                    res.redirect('/');
                    return;
                }
            }
        })        

}

/**
 * if the login is done, send the user to the index.html page
 * @param {Response} res - The response parameter
 *  
 */
function redirect(res){
    res.cookie('logEff','1');
    res.redirect('/index.html');
    return;
}