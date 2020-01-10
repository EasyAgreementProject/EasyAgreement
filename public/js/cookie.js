/**
 * Take the generate cookie
 * @param {string} cname - The cookie name
 *
 */

function getCookie (cname) {
  var name = cname + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

$(document).ready(function () {
  var errName = getCookie('errStudentName')
  var errNameAt = getCookie('erracademicTutorName')
  var errSurnameAt = getCookie('erracademicTutorSurname')
  var errSurname = getCookie('errStudentSurname')
  var errNameS = getCookie('errNameS')
  var errSurnameS = getCookie('errSurnameS')
  var errNameE = getCookie('errexternalTutorName')
  var errSurnameE = getCookie('errexternalTutorSurname')
  var errEmail = getCookie('errStudentEmail')
  var errMatricola = getCookie('errStudentMatricola')
  var errCity = getCookie('errStudentCity')
  var errAddress = getCookie('errStudentAddress')
  var errCorso = getCookie('errStudentCorso')
  var errOldPassword = getCookie('errOldPassword')
  var errPassword = getCookie('errPassword')
  var errPasswordConfirm = getCookie('errPasswordConfirm')
  var errNameT = getCookie('errTutorName')
  var errSurnameT = getCookie('errTutorSurname')
  var errEmailT = getCookie('errTutorEmail')
  var errDepartment = getCookie('errTutorDepartment')
  var errOrganization = getCookie('errOrganizationName')
  var regEff = getCookie('regEff')
  var alreadyReg = getCookie('errAlreadyReg')
  var errUsername = getCookie('errUsername')
  var errLogin = getCookie('errLogin')
  var logEff = getCookie('logEff')
  var logoutEff = getCookie('logoutEff')
  var updateEff = getCookie('updateEff')
  var updatePassEff = getCookie('updatePassEff')
  var successID = getCookie('SuccessIDCard')
  var successCV = getCookie('SuccessCV')
  var errSize = getCookie('errSize')
  var deletedID = getCookie('DeletedID')
  var deletedCV = getCookie('DeletedCV')
  var cannotAccess = getCookie('cannotAccess')
  var errorID = getCookie('errorIDUpload')
  var errorCV = getCookie('errorCVUpload')
  var befDel = getCookie('beforeDelete')
  var ndelID = getCookie('notDeletedID')
  var ndelCV = getCookie('notDeletedCV')
  var nviewID = getCookie('notViewID')
  var nviewCV = getCookie('notViewCV')
  var errErasmusCode = getCookie('errErasmusCode')
  var errFacolta = getCookie('errFacolta')
  var errContatti = getCookie('errContatti')
  var errNameEx = getCookie('errExTutorName')
  var errSurnameEx = getCookie('errExTutorSurname')
  var errEmailEx = getCookie('errExTutorEmail')
  var errAddressH = getCookie('errHAddress')
  var errExTutorName = getCookie('errExTutorName')
  var alreadyRegH = getCookie('errAlreadyRegH')
  var alreadyRegEx = getCookie('errAlreadyRegEx')
  var insertHEff = getCookie('insertHEff')
  var insertEff = getCookie('insertEff')
  var errOrganizationEx = getCookie('errExOrganizationName')
  var notPossible = getCookie('notPossibleForYou')

  if (errAddressH == '1') {
    $('#errAddress').css('display', 'block')
    $('#inputAddress').addClass('errClass')
    document.cookie = 'errHAddress=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (insertEff == '1') {
    swal('Inserimento effettuato', 'tutor esterno inserito con successo', 'success')
    document.cookie = 'insertEff=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (insertHEff == '1') {
    swal('Inserimento effettuato', 'organizzazione ospitante inserita con successo', 'success')
    document.cookie = 'insertHEff=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (alreadyRegH == '1') {
    swal('Errore', 'organizzazione ospitante già presente', 'error')
    document.cookie = 'errAlreadyRegH=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (alreadyRegEx == '1') {
    swal('Errore', 'tutor esterno già presente', 'error')
    document.cookie = 'errAlreadyRegEx=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errErasmusCode == '1') {
    $('#errErasmusCode').css('display', 'block')
    $('#inputErasmusCode').addClass('errClass')
    document.cookie = 'errErasmusCode=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errFacolta == '1') {
    $('#errFacolta').css('display', 'block')
    $('#inputFacolta').addClass('errClass')
    document.cookie = 'errFacolta=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errExTutorName == '1') {
    $('#errNameEx').css('display', 'block')
    $('#inputNameEx').addClass('errClass')
    document.cookie = 'errExTutorName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errContatti == '1') {
    $('#errContatti').css('display', 'block')
    $('#inputContacts').addClass('errClass')
    document.cookie = 'errContatti=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errSize == '1') {
    $('#errSize').css('display', 'block')
    $('#inputSize').addClass('errClass')
    document.cookie = 'errSize=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errOrganizationEx == '1') {
    $('#errOrganizationEx').css('display', 'block')
    $('#inputOrganizzazioneEx').addClass('errClass')
    document.cookie = 'errExOrganizationName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errNameEx == '1') {
    $('#errNameEx').css('display', 'block')
    $('#inputNameEx').addClass('errClass')
    document.cookie = 'errExTutorName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errSurnameEx == '1') {
    $('#errSurnameEx').css('display', 'block')
    $('#inputSurnameEx').addClass('errClass')
    document.cookie = 'errExTutorSurname=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errEmailEx == '1') {
    $('#errEmailEx').css('display', 'block')
    $('#inputEmailEx').addClass('errClass')
    document.cookie = 'errExTutorEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errOrganization == '1') {
    $('#errOrganization').css('display', 'block')
    $('#inputOrganization').addClass('errClass')
    document.cookie = 'errOrganizationName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errName == '1') {
    $('#errName').css('display', 'block')
    $('#inputName').addClass('errClass')
    document.cookie = 'errStudentName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errNameAt == '1') {
    $('#errNameAc').css('display', 'block')
    $('#inputNameAc').addClass('errClass')
    document.cookie = 'erracademicTutorName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errNameS == '1') {
    $('#errNameS').css('display', 'block')
    $('#inputNameS').addClass('errClass')
    document.cookie = 'errNameS=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errSurnameS == '1') {
    $('#errSurnameS').css('display', 'block')
    $('#inputSurnameS').addClass('errClass')
    document.cookie = 'errSurnameS=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errNameE == '1') {
    $('#errNameE').css('display', 'block')
    $('#inputNameE').addClass('errClass')
    document.cookie = 'errexternalTutorName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errSurnameE == '1') {
    $('#errSurnameE').css('display', 'block')
    $('#inputSurnameE').addClass('errClass')
    document.cookie = 'errexternalTutorSurname=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errSurnameAt == '1') {
    $('#errSurnameAc').css('display', 'block')
    $('#inputSurnameAc').addClass('errClass')
    document.cookie = 'erracademicTutorSurname=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errSurname == '1') {
    $('#errSurname').css('display', 'block')
    $('#inputSurname').addClass('errClass')
    document.cookie = 'errStudentSurname=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errEmail == '1') {
    $('#errEmail').css('display', 'block')
    $('#inputEmail').addClass('errClass')
    document.cookie = 'errStudentEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errMatricola == '1') {
    $('#errMatricola').css('display', 'block')
    $('#inputMatricola').addClass('errClass')
    document.cookie = 'errStudentMatricola=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errCity == '1') {
    $('#errCity').css('display', 'block')
    $('#inputCity').addClass('errClass')
    document.cookie = 'errStudentCity=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errAddress == '1') {
    $('#errAddress').css('display', 'block')
    $('#inputAddress').addClass('errClass')
    document.cookie = 'errStudentAddress=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errCorso == '1') {
    $('#errCourse').css('display', 'block')
    $('#inputDegree').addClass('errClass')
    document.cookie = 'errStudentCorso=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errUsername == '1') {
    $('#errUsername').css('display', 'block')
    $('#inputUsername').addClass('errClass')
    document.cookie = 'errUsername=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errPassword == '1') {
    $('#errPassword').css('display', 'block')
    $('#inputPassword').addClass('errClass')
    document.cookie = 'errPassword=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errPasswordConfirm == '1') {
    $('#errConfirmPassword').css('display', 'block')
    $('#inputConfirmPassword').addClass('errClass')
    document.cookie = 'errPasswordConfirm=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errOldPassword == '1') {
    $('#errOldPassword').css('display', 'block')
    $('#inputOldPassword').addClass('errClass')
    document.cookie = 'errOldPassword=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errNameT == '1') {
    $('#errNameT').css('display', 'block')
    $('#inputNameT').addClass('errClass')
    document.cookie = 'errTutorName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errSurnameT == '1') {
    $('#errSurnameT').css('display', 'block')
    $('#inputSurnameT').addClass('errClass')
    document.cookie = 'errTutorSurname=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errEmailT == '1') {
    $('#errEmailT').css('display', 'block')
    $('#inputEmailT').addClass('errClass')
    document.cookie = 'errTutorEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errDepartment == '1') {
    $('#errDepartmentT').css('display', 'block')
    $('#inputDepartmentT').addClass('errClass')
    document.cookie = 'errTutorDepartment=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (regEff == '1') {
    swal('Registrazione effettuata', 'Prosegui con l\'accesso', 'success')
    document.cookie = 'regEff=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (updateEff == '1') {
    swal('Modifica effettuata', 'dati anagrafici modificati correttamente', 'success')
    document.cookie = 'updateEff=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (updatePassEff == '1') {
    swal('Modifica effettuata', 'password modificata correttamente', 'success')
    document.cookie = 'updatePassEff=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (alreadyReg == '1') {
    swal('Utente già registrato', 'Prosegui con l\'accesso', 'info')
    document.cookie = 'errAlreadyReg=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errLogin == '1') {
    swal('Utente non registrato', 'Effettua prima la registrazione', 'error')
    document.cookie = 'errLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (logEff == '1') {
    swal('Benvenuto', 'Login effettuato', 'success')
    document.cookie = 'logEff=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (logoutEff == '1') {
    swal('Arrivederci', 'Logout effettuato', 'success')
    document.cookie = 'logEff=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'logoutEff=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (successCV == '1') {
    swal('Documento caricato', 'Il tuo CV è stato caricato con successo', 'success')
    document.cookie = 'SuccessCV=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (successID == '1') {
    swal('Documento caricato', 'La tua carta d\'identità è stata caricata con successo', 'success')
    document.cookie = 'SuccessIDCard=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (deletedCV == '1') {
    swal('Documento eliminato', 'Il tuo CV è stato eliminato con successo', 'success')
    document.cookie = 'DeletedCV=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (deletedID == '1') {
    swal('Documento eliminato', 'La tua carta d\'identità è stata elimina con successo', 'success')
    document.cookie = 'DeletedID=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (cannotAccess == '1') {
    swal('Effettua l\'accesso', 'Per accedere a questa pagina devi prima effettuare l\'accessso', 'error')
    document.cookie = 'cannotAccess=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errorID == '1') {
    swal('Documento non caricato', 'Controlla il formato del file, accettiamo solo .pdf', 'error')
    document.cookie = 'errorIDUpload=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errorCV == '1') {
    swal('Documento non caricato', 'Controlla il formato del file, accettiamo solo .pdf', 'error')
    document.cookie = 'errorCVUpload=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (befDel == '1') {
    swal('Documento già presente', 'Se lo si vuole aggiornare, eliminare prima il vecchio documento', 'warning')
    document.cookie = 'beforeDelete=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (ndelID == '1') {
    swal('Impossibile eliminare', 'La carta d\'identità non è presente', 'info')
    document.cookie = 'notDeletedID=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (ndelCV == '1') {
    swal('Impossibile eliminare', 'Il curriculum vitae non è presente', 'info')
    document.cookie = 'notDeletedCV=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (nviewID == '1') {
    swal('Impossibile visualizzare', 'La carta d\'identità non è presente', 'info')
    document.cookie = 'notViewID=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (nviewCV == '1') {
    swal('Impossibile visualizzare', 'Il curriculum vitae non è presente', 'info')
    document.cookie = 'notViewCV=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (notPossible == '1') {
    swal('Errore', 'La cancellazione di un utente è limitata all\'admin', 'error')
    document.cookie = 'notPossibleForYou=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
})
