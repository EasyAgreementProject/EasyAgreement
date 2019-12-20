var crypto= require('crypto');

// Hashing e salt of password
exports.hashPassword= function(password) {
    var salt = crypto.randomBytes(256).toString('base64');
    var iterations = 10000;
    var hash = crypto.pbkdf2Sync(password, salt, iterations, 512, 'sha512').toString('hex');

    var passwordHashed={
        salt: salt,
        hash: hash
    };

    return passwordHashed;
}

//Check if password is the same of database
exports.checkPassword= function(savedHash, savedSalt, passwordAttempt){
    return savedHash == crypto.pbkdf2Sync(passwordAttempt, savedSalt, 10000, 512, 'sha512').toString('hex');
}
