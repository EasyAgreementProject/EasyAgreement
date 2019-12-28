$(document).ready(function(){
    $('#formCompile').submit(function(){
        var res= true;

    if($('#inputRadio1').is(':checked').val('Si')){
        if(!testAmount($('#inputAmount').val())){
            res= false;
            $('#errAmount').css('display','block');
            $('#inputAmount').addClass("errClass");
        }else{
            $('#errAmount').css('display','block');
            $('#inputAmount').removeClass("errClass");
        }
    }
    if($('#inputRadio2').is(':checked').val('Si')){
        if(!testContribution($('#inputContribution').val())){
            res= false;
            $('#errContribution').css('display','block');
            $('#inputContribution').addClass("errClass");
        }else{
            $('#errContribution').css('display','block');
            $('#inputContribution').removeClass("errClass");
        }
    }
        if(!testWeeks($('#inputWeeks').val())){
            res= false;
            $('#errWeeks').css('display','block');
            $('#inputWeeks').addClass("errClass");
        }else{
            $('#errWeeks').css('display','block');
            $('#inputWeeks').removeClass("errClass");
        }
        return res;
    });
});
function testAmount(){
    var amount=$('#inputAmount').val();
    if(amount.lenght>0){
        if(/^\d*(,\d+)?€?$/.test(amount)) return true;
    }
    return false;
}
function testContribution(){
    var contribution=$('#inputContribution').val();
    if(contribution.lenght<=500){
        if(/^[\wà-ù\.,"' ]*$/.test(contribution)) return true;
    }
    return false;
}
function testWeeks(){
    var weeks=$('#inputWeeks').val();
    if(weeks.lenght>0){
        if(/^[0-5]{1}$/.test(weeks)) return true;
    }
    return false;
}