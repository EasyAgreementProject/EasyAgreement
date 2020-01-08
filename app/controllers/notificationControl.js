const notificationModel= require('../models/notification');

exports.getAllNotification= function(id, res){
    return new Promise(function(fulfill, reject){
        var notifications= notificationModel.retrieveAll(id);
        notifications.then(function(result){
            if(result!=null){
                for(var i=0; result[i]!=null; i++){
                    result[i].compareData= new Date(result[i].date.year, result[i].date.month-1, result[i].date.day, result[i].date.hour, result[i].date.minutes, result[i].date.seconds);
                }      
                result.sort(function(a,b){
                    if(a.compareData<b.compareData) return -1;
                    if(a.compareData>b.compareData) return 1;
                    return 0;
                });
                for(var i=0; result[i]!=null; i++){
                    delete result[i].compareData;
                }
            }
            fulfill(result);
        });
    });
}

exports.removeNotification= function(id, res){
    return new Promise(function(fulfill, reject){
        var deleted= notificationModel.removeNotification(id);
        deleted.then(function(result){
            fulfill(true);
        });
    });
}

exports.insertNotification= function(notifica){
    return new Promise(function(fulfill, reject){
        var notification= new notificationModel();
        notification.setAssociatedID(notifica.associatedID);
        notification.setText(notifica.text);
        notification.setDate(notifica.date);
        var inserted= notificationModel.insertNotification(notification);
        inserted.then(function(result){
            fulfill(result);
        });
    });
}

exports.refreshNotificationCache= function( associatedId, value){
    return new Promise(function(fulfill, reject){
        var refresh= notificationModel.changeStateCache(associatedId, value);
        refresh.then(function(result){
            fulfill(result);
        });
    });
}

exports.getNotificationCacheState= function(associatedID){
    return new Promise(function(fulfill, reject){
        var get= notificationModel.getStateCache(associatedID);
        get.then(function(result){
            fulfill(result);
        })
    });
}