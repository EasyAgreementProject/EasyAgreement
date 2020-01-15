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
  var errAward = getCookie('errAward')
  var errNumberCredits = getCookie('errNumberCredits')
  var errMissingFields = getCookie('errMissingFields')
  var errCompileOnlyOne = getCookie('errCompileOnlyOne')
  var errRequest = getCookie('errRequest')
  var saveSuccess = getCookie('saveSuccess')
  var succRequest = getCookie('succRequest')

  if (errAward == '1') {
    $('#errCredits').css('display', 'block')
    $('#inputCredits').addClass('errClass')
    document.cookie = 'errAward=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errNumberCredits == '1') {
    $('#errCredits2').css('display', 'block')
    $('#inputCredits2').addClass('errClass')
    document.cookie = 'errNumberCredits=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errMissingFields == '1') {
    swal('Compila tutti i campi!', '', 'warning')
    document.cookie = 'errMissingFields=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errCompileOnlyOne == '1') {
    swal('Compila solo uno dei due form!!', '', 'warning')
    document.cookie = 'errCompileOnlyOne=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errRequest == '1') {
    swal('Non è possibile approvare la richiesta', "Puoi controllare lo stato della richiesta nell'apposita pagina.", 'error')
    document.cookie = 'errRequest=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (saveSuccess == '1') {
    swal('Salvataggio effettuato', 'Puoi continuare la compilazione in un secondo momento.', 'success')
    document.cookie = 'saveSuccess=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (succRequest == '1') {
    swal('Richiesta approvata', "Puoi controllare lo stato della richiesta nell'apposita pagina.", 'success')
    document.cookie = 'succRequest=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
})
