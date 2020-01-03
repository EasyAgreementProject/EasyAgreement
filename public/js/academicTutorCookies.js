/**
 * Take the generate cookie
 * @param {string} cname - The cookie name
 * 
 */

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

$(document).ready(function() {
    var cookie = document.cookie;
    var errAward = getCookie("errAward");
    var errNumberCredits = getCookie("errNumberCredits");
    var errMissingFields = getCookie("errMissingFields");
    var errCompileOnlyOne = getCookie("errCompileOnlyOne");

    if (errAward == "1") {
        $('#errCredits').css('display', 'block');
        $('#inputCredits').addClass("errClass");
        document.cookie = "errAward=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if (errNumberCredits == "1") {
        $('#errCredits2').css('display', 'block');
        $('#inputCredits2').addClass("errClass");
        document.cookie = "errNumberCredits=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if (errMissingFields == "1") {
        alert("Compila tutti i campi!");
        document.cookie = "errMissingFields=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if (errCompileOnlyOne == "1") {
        alert("Compila solo uno dei due form!");
        document.cookie = "errCompileOnlyOne=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
});