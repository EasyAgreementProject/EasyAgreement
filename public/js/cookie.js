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

$(document).ready(function(){
    var cookie=document.cookie;
    var errName=getCookie("errStudentName");
    var errSurname=getCookie("errStudentSurname");
    var errEmail=getCookie("errStudentEmail");
    var errMatricola=getCookie("errStudentMatricola");
    var errCity=getCookie("errStudentCity");
    var errAddress=getCookie("errStudentAddress");
    var errCorso=getCookie("errStudentCorso");
    var errPassword=getCookie("errPassword");
    var errPasswordConfirm=getCookie("errPasswordConfirm");
    var errNameT=getCookie("errTutorName");
    var errSurnameT=getCookie("errTutorSurname");
    var errEmailT=getCookie("errTutorEmail");
    var errDepartment=getCookie("errTutorDepartment");

    if(errName=="1"){
        $('#errName').css('display','block');
        $('#inputName').addClass("errClass");
        document.cookie="errStudentName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errSurname=="1"){
        $('#errSurname').css('display','block');
        $('#inputSurname').addClass("errClass");
        document.cookie="errStudentSurname=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errEmail=="1"){
        $('#errEmail').css('display','block');
        $('#inputEmail').addClass("errClass");
        document.cookie="errStudentEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errMatricola=="1"){
        $('#errMatricola').css('display','block');
        $('#inputMatricola').addClass("errClass");
        document.cookie="errStudentMatricola=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errCity=="1"){
        $('#errCity').css('display','block');
        $('#inputCity').addClass("errClass");
        document.cookie="errStudentCity=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errAddress=="1"){
        $('#errAddress').css('display','block');
        $('#inputAddress').addClass("errClass");
        document.cookie="errStudentAddress=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errCorso=="1"){
        $('#errCourse').css('display','block');
        $('#inputCourse').addClass("errClass");
        document.cookie="errStudentCorso=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errPassword=="1"){
        $('#errPassword').css('display','block');
        $('#inputPassword').addClass("errClass");
        document.cookie="errPassword=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errPasswordConfirm=="1"){
        $('#errConfirmPassword').css('display','block');
        $('#inputConfirmPassword').addClass("errClass");
        document.cookie="errPasswordConfirm=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errNameT=="1"){
        $('#errNameT').css('display','block');
        $('#inputNameT').addClass("errClass");
        document.cookie="errTutorName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errSurnameT=="1"){
        $('#errSurnameT').css('display','block');
        $('#inputSurnameT').addClass("errClass");
        document.cookie="errTutorSurname=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errEmailT=="1"){
        $('#errEmailT').css('display','block');
        $('#inputEmailT').addClass("errClass");
        document.cookie="errTutorEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    if(errDepartment=="1"){
        $('#errDepartmentT').css('display','block');
        $('#inputDepartmentT').addClass("errClass");
        document.cookie="errTutorDepartment=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
});