$(document).ready(function() {
    $('#formUpdate').submit(function() {
        var res = true;

        if (!testName($('#inputName').val())) {
            res = false;
            $('#errName').css('display', 'block');
            $('#inputName').addClass("errClass");
        } else {
            $('#errName').css('display', 'none');
            $('#inputName').removeClass("errClass");
        }
        if (!testSurname($('#inputSurname').val())) {
            res = false;
            $('#errSurname').css('display', 'block');
            $('#inputSurname').addClass("errClass");
        }
        else {
            $('#errSurnaame').css('display', 'none');
            $('#inputSurname').removeClass("errClass");
        }


        
        return res;

    });
});

    function testName(name) {
        if (name.length >= 2) {
            if (/^[A-Za-z]+$/.test(name)) return true;
        }
        return false;
    }

    function testSurname(surname) {
        if (surname.length >= 2) {
            var exp = new RegExp("^[A-Za-z]+$");
            if (/^[A-Za-z]+$/.test(surname)) return true;
        }
        return false;
    }


    function testEmail(email) {
        if (email.length >= 6) {
            var exp = new RegExp("^[A-Za-z]+$");
            if (!/^[a-z]\.[a-z]+[0-9]*\@studenti.unisa.it/.test(email)) return true;
            
        }
        return false;
    }