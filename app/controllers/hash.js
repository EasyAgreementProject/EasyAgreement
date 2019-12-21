var crypto= require('crypto');

/**
 * Hashing and salt function for password
 * @param {string} password - The user password
 * @returns {string} passwordHashed - Encrypted password 
 */
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

/** 
 * Compare password in login phase, if it's equal return true, else return false.
 * @param {string} savedHash - The saved encrypted password
 * @param {string} savedSalt - The saved salt password
 * @param {string} passwordAttempt - The attempt password
 * @returns {Boolean} 
 * 
*/
exports.checkPassword= function(savedHash, savedSalt, passwordAttempt){
    return savedHash == crypto.pbkdf2Sync(passwordAttempt, savedSalt, 10000, 512, 'sha512').toString('hex');
}
