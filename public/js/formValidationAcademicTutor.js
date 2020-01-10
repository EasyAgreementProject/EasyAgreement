$('#send').click(function () {
  $('#formCompile').submit(function () {
    var res = true

    if ($('#inputCredits').is(':checked')) {
      if (!testAward($('#inputCredits').val())) {
        res = false
        $('#errAward').css('display', 'block')
        $('#inputCredits').addClass('errClass')
      } else {
        $('#errAward').css('display', 'none')
        $('#inputCredits').removeClass('errClass')
      }
    } else if ($('#inputCredits2').is(':checked')) {
      if (!testNumberCredits($('#inputCredits2').val())) {
        res = false
        $('#errNumberCredits').css('display', 'block')
        $('#inputCredits2').addClass('errClass')
      } else {
        $('#errNumberCredits').css('display', 'none')
        $('#inputCredits2').removeClass('errClass')
      }
    }
    return res
  })
})

function testAward () {
  var award = $('#inputAward').val()
  if (award.length >= 1) {
    if (/^\d{1,2}$/.test(award)) return true
  }
  return false
}

function testNumberCredits () {
  var credits = $('#inputNumberCredits').val()
  if (credits.lenght >= 1) {
    if (/^\d{1,2}$/.test(credits)) return true
  }
  return false
}
