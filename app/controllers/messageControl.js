var academicModel= require('../models/academicTutor');
var externalModel= require('../models/externaltutor');
var studentModel= require('../models/student');
var messageModel= require('../models/message');

exports.getAllContacts= function(type, res){
    return new Promise(function(fulfill, reject){
        var users=null;
        if(type=="academicTutor"){
            users=academicModel.RetrieveAll();
        }
        else if(type=="student"){
            users=studentModel.RetrieveAll();
        }
        else if(type=="externalTutor"){
            users=externalModel.RetrieveAll();
        }
        users.then(function(result){
            fulfill(result);
        });
    });
}

exports.getAllMessages= function(sender, receiver, res){
    return new Promise(function(fulfill, reject){
        var chat= messageModel.getTextChat(sender, receiver);
        chat.then(function(result){
            var senderArray=result.sender;
            var recipientArray= result.recipient;
            var i=0;

            for(i=0; senderArray[i]!=null; i++){
                senderArray[i].compareData= new Date(senderArray[i].date.year, senderArray[i].date.month-1, senderArray[i].date.day, senderArray[i].date.hour, senderArray[i].date.minutes, senderArray[i].date.seconds);
            }

            senderArray.sort(function(a,b){
                if(a.compareData<b.compareData) return -1;
                if(a.compareData>b.compareData) return 1;
                return 0;
            });

            for(i=0; senderArray[i]!=null; i++){
                delete senderArray[i].compareData;
            }

            for(i=0; recipientArray[i]!=null; i++){
                recipientArray[i].compareData= new Date(recipientArray[i].date.year, recipientArray[i].date.month-1, recipientArray[i].date.day, recipientArray[i].date.hour, recipientArray[i].date.minutes, recipientArray[i].date.seconds);
            }

            recipientArray.sort(function(a,b){
                if(a.compareData<b.compareData) return -1;
                if(a.compareData>b.compareData) return 1;
                return 0;
            });

            for(i=0; recipientArray[i]!=null; i++){
                delete recipientArray[i].compareData;
            }
    
            var array={sender: senderArray , recipient: recipientArray};
            fulfill(array);
        });
    });
}

exports.saveMessage= function(message, res){
    return new Promise(function(fulfill, reject){
        var messaggio= new messageModel();
        messaggio.setSenderID(message.senderID);
        messaggio.setRecipientID(message.recipientID);
        messaggio.setText(message.text);
        messaggio.setDate(message.date);
        var save= messageModel.insertMessage(messaggio);
        save.then(function(result){
            fulfill(result);
        });
    });
}

exports.updateMessage= function(id, text, res){
    return new Promise(function(fulfill, reject){
        var update= messageModel.updateMessage(id, text);
        update.then(function(result){
            fulfill({boolean: true});
        });
    });
}

exports.removeMessage= function(messageID, res){
    return new Promise(function(fulfill, reject){
        var remove= messageModel.removeMessage(messageID);
        remove.then(function(result){
            fulfill({boolean: true});
        });
    });
}

exports.searchUser= function(type, search, res){
    return new Promise(function(fulfill, reject){
        var name=null;
        var surname=null;
        var users1=[];
        var users2=[];
        if(search.indexOf(" ")==-1){
            name= search;
        }
        else{
            name=search.substring(0, search.indexOf(" "));
            surname= search.substring(search.indexOf(" ")+1);
        }
        if(type=="academicTutor"){
            var students=studentModel.RetrieveAll();
            students.then(function(result){
                if(!result.length==0){
                    for(var i=0; result[i]!=null; i++){
                        if(surname==null){
                            if(result[i].Name==name)    users1.push(result[i]);
                            if(result[i].Surname==name) users1.push(result[i]);
                        }
                        else{
                            if(result[i].Name==name && result[i].Surname==surname)  users1.push(result[i]);
                            if(result[i].Name==surname && result[i].Surname==name)  users1.push(result[i]);
                        }
                    }
                }
                var externals=externalModel.RetrieveAll();
                externals.then(function(result){
                    if(!result.length==0){
                        for(var i=0; result[i]!=null; i++){
                            if(surname==null){
                                if(result[i].Name==name)    users2.push(result[i]);
                                if(result[i].Surname==name) users2.push(result[i]);
                            }
                            else{
                                if(result[i].Name==name && result[i].Surname==surname)  users2.push(result[i]);
                                if(result[i].Name==surname && result[i].Surname==name)  users2.push(result[i]);
                            }
                        }
                    }
                    fulfill({student: users1, external: users2, type:"academicTutor"});
                });
            });
        }
        else if(type=="student"){
            var academics=academicModel.RetrieveAll();
            academics.then(function(result){
                if(!result.length==0){
                    for(var i=0; result[i]!=null; i++){
                        if(surname==null){
                            if(result[i].Name==name)    users1.push(result[i]);
                            if(result[i].Surname==name) users1.push(result[i]);
                        }
                        else{
                            if(result[i].Name==name && result[i].Surname==surname)  users1.push(result[i]);
                            if(result[i].Name==surname && result[i].Surname==name)  users1.push(result[i]);
                        }
                    }
                }
                var externals=externalModel.RetrieveAll();
                externals.then(function(result){
                    if(!result.length==0){
                        for(var i=0; result[i]!=null; i++){
                            if(surname==null){
                                if(result[i].Name==name)    users2.push(result[i]);
                                if(result[i].Surname==name) users2.push(result[i]);
                            }
                            else{
                                if(result[i].Name==name && result[i].Surname==surname)  users2.push(result[i]);
                                if(result[i].Name==surname && result[i].Surname==name)  users2.push(result[i]);
                            }
                        }
                    }
                    fulfill({academic: users1, external: users2, type:"student"});
                });
            });
        }
        else if(type=="externalTutor"){
            var students=studentModel.RetrieveAll();
            students.then(function(result){
                if(!result.length==0){
                    for(var i=0; result[i]!=null; i++){
                        if(surname==null){
                            if(result[i].Name==name)    users1.push(result[i]);
                            if(result[i].Surname==name) users1.push(result[i]);
                        }
                        else{
                            if(result[i].Name==name && result[i].Surname==surname)  users1.push(result[i]);
                            if(result[i].Name==surname && result[i].Surname==name)  users1.push(result[i]);
                        }
                    }
                }
                var academics=academicModel.RetrieveAll();
                academics.then(function(result){
                    if(!result.length==0){
                        for(var i=0; result[i]!=null; i++){
                            if(surname==null){
                                if(result[i].Name==name)    users2.push(result[i]);
                                if(result[i].Surname==name) users2.push(result[i]);
                            }
                            else{
                                if(result[i].Name==name && result[i].Surname==surname)  users2.push(result[i]);
                                if(result[i].Name==surname && result[i].Surname==name)  users2.push(result[i]);
                            }
                        }
                    }
                    fulfill({student: users1, academic: users2,type: "externalTutor"});
                });
            });
        }
    });
}

exports.refreshMessageCache= function( receiverID, senderID, value){
    return new Promise(function(fulfill, reject){
        var refresh= messageModel.changeStateCache(receiverID, senderID, value);
        refresh.then(function(result){
            fulfill(result);
        });
    });
}

exports.getAllCache= function(receiverID){
    return new Promise(function(fulfill, reject){
        var get=messageModel.getAllCache(receiverID);
        get.then(function(result){
            fulfill(result);
        });
    })
}