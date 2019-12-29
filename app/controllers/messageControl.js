var academicModel= require('../models/academicTutor');
var externalModel= require('../models/externaltutor');
var studentModel= require('../models/student');
var messageModel= require('../models/message');

exports.getAllContacts= function(type, res){
    var users=null;
    if(type=="academic"){
        users=academicModel.RetrieveAll();
    }
    else if(type=="student"){
        users=studentModel.RetrieveAll();
    }
    else if(type=="external"){
        users=externalModel.RetrieveAll();
    }
    users.then(function(result){
        res.json(result);
    });
}

exports.getAllMessages= function(sender, receiver, res){
    var chat= messageModel.getTextChat(sender, receiver);
    chat.then(function(result){
        senderArray=result.sender;
        recipientArray= result.recipient;

        var i=1;
        if(senderArray==null) return null;
        for(;senderArray[i]!=null; i++){
            var temp=null;
            if(senderArray[i].date.year<senderArray[i-1].date.year){
                temp= senderArray[i];
                senderArray[i]=senderArray[i-1];
                senderArray[i-1]=temp;
            }
            else if(senderArray[i].date.year==senderArray[i-1].date.year){
                if(senderArray[i].date.month<senderArray[i-1].date.month){
                    temp= senderArray[i];
                    senderArray[i]=senderArray[i-1];
                    senderArray[i-1]=temp;
                }
                else if(senderArray[i].date.month==senderArray[i-1].date.month){
                    if(senderArray[i].date.day<senderArray[i-1].date.day){
                        temp= senderArray[i];
                        senderArray[i]=senderArray[i-1];
                        senderArray[i-1]=temp;
                    }
                    else if(senderArray[i].date.day==senderArray[i-1].date.day){
                        if(senderArray[i].date.hour<senderArray[i-1].date.hour){
                            temp= senderArray[i];
                            senderArray[i]=senderArray[i-1];
                            senderArray[i-1]=temp;
                        }
                        else if(senderArray[i].date.hour==senderArray[i-1].date.hour){
                            if(senderArray[i].date.minutes<senderArray[i-1].date.minutes){
                                temp= senderArray[i];
                                senderArray[i]=senderArray[i-1];
                                senderArray[i-1]=temp;
                            }
                            else if(senderArray[i].date.minutes==senderArray[i-1].date.minutes){
                                if(senderArray[i].date.seconds<senderArray[i-1].date.seconds){
                                    temp= senderArray[i];
                                    senderArray[i]=senderArray[i-1];
                                    senderArray[i-1]=temp;
                                }
                            }
                        }
                    }
                }
            }
        }

        i=1;
        if(recipientArray==null)    return null;
        for(;recipientArray[i]!=null; i++){
            var temp=null;
            if(recipientArray[i].date.year<recipientArray[i-1].date.year){
                temp= recipientArray[i];
                recipientArray[i]=recipientArray[i-1];
                recipientArray[i-1]=temp;
            }
            else if(recipientArray[i].date.year==recipientArray[i-1].date.year){
                if(recipientArray[i].date.month<recipientArray[i-1].date.month){
                    temp= recipientArray[i];
                    recipientArray[i]=recipientArray[i-1];
                    recipientArray[i-1]=temp;
                }
                else if(recipientArray[i].date.month==recipientArray[i-1].date.month){
                    if(recipientArray[i].date.day<recipientArray[i-1].date.day){
                        temp= recipientArray[i];
                        recipientArray[i]=recipientArray[i-1];
                        recipientArray[i-1]=temp;
                    }
                    else if(recipientArray[i].date.day==recipientArray[i-1].date.day){
                        if(recipientArray[i].date.hour<recipientArray[i-1].date.hour){
                            temp= recipientArray[i];
                            recipientArray[i]=recipientArray[i-1];
                            recipientArray[i-1]=temp;
                        }
                        else if(recipientArray[i].date.hour==recipientArray[i-1].date.hour){
                            if(recipientArray[i].date.minutes<recipientArray[i-1].date.minutes){
                                temp= recipientArray[i];
                                recipientArray[i]=recipientArray[i-1];
                                recipientArray[i-1]=temp;
                            }
                            else if(recipientArray[i].date.minutes==recipientArray[i-1].date.minutes){
                                if(recipientArray[i].date.seconds<recipientArray[i-1].date.seconds){
                                    temp= recipientArray[i];
                                    recipientArray[i]=recipientArray[i-1];
                                    recipientArray[i-1]=temp;
                                }
                            }
                        }
                    }
                }
            }
        }
        var array={sender: senderArray , recipient: recipientArray};
        res.json(array);
    });
}

exports.saveMessage= function(message, res){
    var save= messageModel.insertMessage(message);
    save.then(function(result){
        res.json(result);
    });
}

exports.updateMessage= function(message){

}

exports.removeMessage= function(messageID, res){
    var remove= messageModel.removeMessage(messageID);
    remove.then(function(result){
        res.json();
    })
}

exports.getConnectedUser= function(req){
    return req.session.utente;
}