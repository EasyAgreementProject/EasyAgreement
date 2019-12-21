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

/** 
 * Check the cookie error code
 */
$(document).ready(function(){
    var cookie=document.cookie;
    var errUsername=getCookie("errUsername");
    var errPassword=getCookie("errPassword");
    var errLogin= getCookie("errLogin");
    var logEff=getCookie("logEff");

    if(errUsername=="1"){
        $('#errUsername').css('display','block');
        $('#inputUsername').addClass("errClass");
        document.cookie="errUsername=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }

    if(errPassword=="1"){
        $('#errPassword').css('display','block');
        $('#inputPassword').addClass("errClass");
        document.cookie="errPassword=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }    

    if(errLogin=="1"){
      swal('Utente non registrato', 'Effettua prima la registrazione', 'error');
      document.cookie="errLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }   

  if(logEff=="1"){
    swal('Benvenuto', 'Login effettuato', 'success');
    document.cookie="logEff=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }   

});