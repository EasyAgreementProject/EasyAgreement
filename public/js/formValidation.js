$(document).ready(function() {
    $('#formCompile').submit(function() {
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
        } else {
            $('#errSurname').css('display', 'none');
            $('#inputSurname').removeClass("errClass");
        }
        if (!testTelephone()) {
            res = false;
            $('#errTelephone').css('display', 'block');
            $('#inputTelephone').addClass("errClass");
        } else {
            $('#errTelephone').css('display', 'none');
            $('#inputTelephone').removeClass("errClass");
        }

        if (!testStudyCicle()) {
            res = false;
            $('#errStudyCicle').css('display', 'block');
            $('#inputStudyCicle').addClass("errClass");
        } else {
            $('#errStudyCicle').css('display', 'none');
            $('#inputStudyCicle').removeClass("errClass");
        }
        if (!testAcademicYear1()) {
            res = false;
            $('#errAcademicYear1').css('display', 'block');
            $('#inputAcademicYear1').addClass("errClass");
        } else {
            $('#errAcademicYear1').css('display', 'none');
            $('#inputAcademicYear1').removeClass("errClass");
        }
        if (!testAcademicYear2()) {
            res = false;
            $('#errAcademicYear2').css('display', 'block');
            $('#inputAcademicYear2').addClass("errClass");
        } else {
            $('#errAcademicYear2').css('display', 'none');
            $('#inputAcademicYear2').removeClass("errClass");
        }
        if (!testSubjectCode()) {
            res = false;
            $('#errSubjectCode').css('display', 'block');
            $('#inputSubjectCode').addClass("errClass");
        } else {
            $('#errSubjectCode').css('display', 'none');
            $('#inputSubjectCode').removeClass("errClass");
        }
        if (!testEmail()) {
            res = false;
            $('#errEmail').css('display', 'block');
            $('#inputEmail').addClass("errClass");
        } else {
            $('#errEmail').css('display', 'none');
            $('#inputEmail').removeClass("errClass");
        }
        if (!testDepartmentSending()) {
            res = false;
            $('#errDepartmentSending').css('display', 'block');
            $('#inputDepartmentSending').addClass("errClass");
        } else {
            $('#errDepartmentSending').css('display', 'none');
            $('#inputDepartmentSending').removeClass("errClass");
        }
        if (!testContactName()) {
            res = false;
            $('#errContactName').css('display', 'block');
            $('#inputContactName').addClass("errClass");
        } else {
            $('#errContactName').css('display', 'none');
            $('#inputContactName').removeClass("errClass");
        }
        if (!testContactSending()) {
            res = false;
            $('#errContactSending').css('display', 'block');
            $('#inputContactSending').addClass("errClass");
        } else {
            $('#errContactSending').css('display', 'none');
            $('#inputContactSending').removeClass("errClass");
        }
        if (!testNameSector()) {
            res = false;
            $('#errNameSector').css('display', 'block');
            $('#inputNameSector').addClass("errClass");
        } else {
            $('#errNameSector').css('display', 'none');
            $('#inputNameSector').removeClass("errClass");
        }
        if (!testDepartmentReciving()) {
            res = false;
            $('#errDepartmentReciving').css('display', 'block');
            $('#inputDepartmentReciving').addClass("errClass");
        } else {
            $('#errDepartmentReciving').css('display', 'none');
            $('#inputDepartmentReciving').removeClass("errClass");
        }
        if (!testAddressWebSite()) {
            res = false;
            $('#errAddressWebSite').css('display', 'block');
            $('#inputAddressWebSite').addClass("errClass");
        } else {
            $('#errAddressWebSite').css('display', 'none');
            $('#inputAddressWebSite').removeClass("errClass");
        }
        if (!testSizeEnterprise()) {
            res = false;
            $('#errSizeEnterprise').css('display', 'block');
            $('#inputSizeEnterprise').addClass("errClass");
        } else {
            $('#errSizeEnterprise').css('display', 'none');
            $('#inputSizeEnterprise').removeClass("errClass");
        }
        if (!testContactReciving()) {
            res = false;
            $('#errContactReciving').css('display', 'block');
            $('#inputContactReciving').addClass("errClass");
        } else {
            $('#errContactReciving').css('display', 'none');
            $('#inputContactReciving').removeClass("errClass");
        }
        if (!testMentor()) {
            res = false;
            $('#errMentor').css('display', 'block');
            $('#inputMentor').addClass("errClass");
        } else {
            $('#errMentor').css('display', 'none');
            $('#inputMentor').removeClass("errClass");
        }
        if (!testMentorInfo()) {
            res = false;
            $('#errMentorInfo').css('display', 'block');
            $('#inputMentorInfo').addClass("errClass");
        } else {
            $('#errMentorInfo').css('display', 'none');
            $('#inputMentorInfo').removeClass("errClass");
        }
        if (!testDateFrom()) {
            res = false;
            $('#errDateFrom').css('display', 'block');
            $('#inputDateFrom').addClass("errClass");
        } else {
            $('#errDateFrom').css('display', 'none');
            $('#inputDateFrom').removeClass("errClass");
        }
        if (!testDateTo()) {
            res = false;
            $('#errDateTo').css('display', 'block');
            $('#inputDateTo').addClass("errClass");
        } else {
            $('#errDateTo').css('display', 'none');
            $('#inputDateTo').removeClass("errClass");
        }
        if (!testHourWork()) {
            res = false;
            $('#errHourWork').css('display', 'block');
            $('#inputHourWork').addClass("errClass");
        } else {
            $('#errHourWork').css('display', 'none');
            $('#inputHourWork').removeClass("errClass");
        }
        if (!testTitle()) {
            res = false;
            $('#errTitle').css('display', 'block');
            $('#inputTitle').addClass("errClass");
        } else {
            $('#errTitle').css('display', 'none');
            $('#inputTitle').removeClass("errClass");
        }
        if (!testDetailed()) {
            res = false;
            $('#errDetailed').css('display', 'block');
            $('#inputDetailed').addClass("errClass");
        } else {
            $('#errDetailed').css('display', 'none');
            $('#inputDetailed').removeClass("errClass");
        }
        if (!testKnowledge()) {
            res = false;
            $('#errKnowledge').css('display', 'block');
            $('#inputKnowledge').addClass("errClass");
        } else {
            $('#errKnowledge').css('display', 'none');
            $('#inputKnowledge').removeClass("errClass");
        }
        if (!testMonitoring()) {
            res = false;
            $('#errMonitoring').css('display', 'block');
            $('#inputMonitoring').addClass("errClass");
        } else {
            $('#errMonitoring').css('display', 'none');
            $('#inputMonitoring').removeClass("errClass");
        }
        if (!testEvaluation()) {
            res = false;
            $('#errEvaluation').css('display', 'block');
            $('#inputEvaluation').addClass("errClass");
        } else {
            $('#errEvaluation').css('display', 'none');
            $('#inputEvaluation').removeClass("errClass");
        }
        if (!testLanguage()) {
            res = false;
            $('#errLenguage').css('display', 'block');
            $('#inputLenguage').addClass("errClass");
        } else {
            $('#errLenguage').css('display', 'none');
            $('#inputLenguage').removeClass("errClass");
        }

        return res;

    });
});


function testName(name) {
    if (name.length >= 2) {
        var exp = new RegExp("^[A-Za-z]+$");
        if (exp.test(name)) return true;
    }
    return false;
}

function testSurname(surname) {
    if (surname.length >= 2) {
        var exp = new RegExp("^[A-Za-z]+$");
        if (exp.test(surname)) return true;
    }
    return false;
}

function testTelephone() {
    var telephone = $('#inputTelephone').val();
    if (telephone.length == 10 || telephone.length == 9) {
        var exp = new RegExp("^\d{9,10}$");
        if (exp.test(telephone)) return true;
    }
    return false;
}

function testStudyCicle() {
    var studyCicle = $('#inputStudyCicle').val();
    if (studyCicle.length >= 6) {
        var exp = new RegExp("^(1st (C|c){1}ycle|2nd (C|c){1}ycle)$");
        if (exp.test(studyCicle)) return true;
    }
    return false;
}

function testAcademicYear1() {
    var academicYear1 = $('#inputAcademicYear1').val();
    if (academicYear1.length == 2) {
        var exp = new RegExp("^\d{2}$");
        if (exp.test(academicYear1)) return true;
    }
    return false;
}

function testAcademicYear2() {
    var academicYear2 = $('#inputAcademicYear2').val();
    if (academicYear2.length == 2) {
        var exp = new RegExp("^\d{2}$");
        if (exp.test(academicYear2)) return true;
    }
    return false;
}

function testSubjectCode() {
    var subjectCode = $('#inputSubjectCode').val();
    if (subjectCode.length >= 5) {
        var exp = new RegExp("^[A-za-zà-ù]+\,{1} ?\d+");
        if (exp.test(subjectCode)) return true;
    }
    return false;
}

function testEmail() {
    var email = $('#inputEmail').val().toLowerCase();
    if (email.length >= 3) {
        var exp = new RegExp("^[a-z]{1}\.{1}[a-z]{2,}\d{1,}@{1}(studenti.unisa.it){1}$");
        if (exp.test(email)) return true;
    }
    return false;
}

function testDepartmentSending() {
    var departmentSending = $('#inputDepartmentSending').val();
    if (departmentSending.length >= 4) {
        var exp = new RegExp("^\w+$");
        if (exp.test(departmentSending)) return true;
    }
    return false;
}

function testContactName() {
    var contactName = $('#inputContactName').val();
    if (contactName.length >= 4) {
        var exp = new RegExp("^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$");
        if (exp.test(contactName)) return true;
    }
    return false;
}

function testContactSending() {
    var contactSending = $('#inputContactSending').val();
    if (contactSending.length >= 10) {
        var exp = new RegExp("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$");
        if (exp.test(contactSending)) return true;
    }
    return false;
}

function testNameSector() {
    var nameSector = $('#inputNameSector').val();
    if (nameSector.length >= 5) {
        var exp = new RegExp("^[A-za-zà-ù]+( [A-za-zà-ù]+)*$");
        if (exp.test(nameSector)) return true;
    }
    return false;
}

function testDepartmentReciving() {
    var departmentReciving = $('#inputDepartmentReciving').val();
    if (departmentReciving.length >= 5) {
        var exp = new RegExp("^[A-za-zà-ù]+( [A-za-zà-ù]+)*$");
        if (exp.test(departmentReciving)) return true;
    }
    return false;
}

function testAddressWebSite() {
    var addressWebSite = $('#inputAddressWebSite').val();
    if (addressWebSite.length >= 5) {
        var exp = new RegExp("^[\w ,\.']+ ?(,|\/)? (http(s)?:\\\\)?www\.\w+\.(\w+\.)*\w{2,3}$");
        if (exp.test(addressWebSite)) return true;
    }
    return false;
}

function testSizeEnterprise() {
    var sizeEnterprise = $('#inputSizeEnterprise').val();
    if (sizeEnterprise.length >= 3) {
        var exp = new RegExp("^\d+( ?[- \/] ?\d+)?$");
        if (exp.test(sizeEnterprise)) return true;
    }
    return false;
}

function testContactReciving() {
    var contactReciving = $('#inputContactReciving').val();
    if (contactReciving.length >= 3) {
        var exp = new RegExp("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$");
        if (exp.test(contactReciving)) return true;
    }
    return false;
}

function testMentor() {
    var mentor = $('#inputMentor').val();
    if (mentor.length >= 4) {
        var exp = new RegExp("^[A-za-zà-ùà-ù]+ {1}[A-za-zà-ùà-ù]+( {1}[A-za-zà-ùà-ù])?( ?\/|,)? {1}[A-za-zà-ùà-ù]+$");
        if (exp.test(mentor)) return true;
    }
    return false;
}

function testMentorInfo() {
    var mentorInfo = $('#inputMentorInfo').val();
    if (mentorInfo.length >= 10) {
        var exp = new RegExp("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$");
        if (exp.test(mentorInfo)) return true;
    }
    return false;
}

function testDateFrom() {
    var datefrom = $('#inputDateFrom').val();
    if (datefrom.length >= 2) {
        var exp = new RegExp("^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$");
        if (exp.test(datefrom)) return true;
    }
    return false;
}

function testDateTo() {
    var dateto = $('#inputDateTo').val();
    if (dateto.length >= 2) {
        var exp = new RegExp("^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$");
        if (exp.test(dateto)) return true;
    }
    return false;
}

function testHourWork() {
    var hw = $('#inputHourWork').val();
    if (hw.length >= 2) {
        var exp = new RegExp("^\d{1,2}$");
        if (exp.test(hw)) return true;
    }
    return false;
}

function testTitle() {
    var title = $('#inputTitle').val();
    if (title.length >= 3) {
        var exp = new RegExp("^[A-za-zà-ù,'à-ù0-9]+( [A-za-zà-ù,'à-ù0-9]+)*$");
        if (exp.test(title)) return true;
    }
    return false;
}

function testDetailed() {
    var detailed = $('#inputDetailed').val();
    if (detailed.length >= 10) {
        var exp = new RegExp("^[A-za-zà-ù\.,';à-ù0-9]+( [A-za-zà-ù\.,';à-ù0-9]+)*$");
        if (exp.test(detailed)) return true;
    }
    return false;
}

function testKnowledge() {
    var knowledge = $('#inputKnowledge').val();
    if (knowledge.length >= 10) {
        var exp = new RegExp("^[A-za-zà-ù\.,';à-ù0-9]+( [A-za-zà-ù\.,';à-ù0-9]+)*$");
        if (exp.test(knowledge)) return true;
    }
    return false;
}

function testMonitoring() {
    var monitoring = $('#inputMonitoring').val();
    if (monitoring.length >= 10) {
        var exp = new RegExp("^[A-za-zà-ù\.,';à-ù0-9]+( [A-za-zà-ù\.,';à-ù0-9]+)*$");
        if (exp.test(monitoring)) return true;
    }
    return false;
}

function testEvaluation() {
    var evaluation = $('#inputEvaluation').val();
    if (evaluation.length >= 10) {
        var exp = new RegExp("^[A-za-zà-ù\.,';à-ù0-9]+( [A-za-zà-ù\.,';à-ù0-9]+)*$");
        if (exp.test(evaluation)) return true;
    }
    return false;
}

function testLanguage() {
    var language = $('#inputLenguage').val();
    if (language.length >= 10) {
        var exp = new RegExp("^[A-za-zà-ù]+$");
        if (exp.test(language)) return true;
    }
    return false;
}