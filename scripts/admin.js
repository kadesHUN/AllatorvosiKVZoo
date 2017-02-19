
//datetime-local konvertálása js dátum formátumra

function parseYMDHM(s) {
  var b = s.split(/\D+/);
  return new Date(b[0], --b[1], b[2], b[3], b[4], b[5]||0, b[6]||0);
}

// a hátralévő nap,óra,perc.másodperc visszadása tömbben

function dateCounter(startDate){
    var actDate = new Date();
    var difference;
    var result=[];
    var converter =[24,60,60,1000];
    var divisor = 1;
    divisor=converter.reduce(function(acc, val) {return acc * val;}, 1);
    difference=startDate-actDate;
    for (var i=0 ; i<converter.length; i++) {
        result[i]=Math.floor(difference/divisor);
        difference=difference%divisor;
        divisor/=converter[i];
    }
    return result;
}

function myTimer() {
    var myCounter;
    var counterArray=[];
    counterArray=dateCounter(newOpen);
    myCounter = document.getElementsByClassName("counterBig");
    for (var i=0; i<myCounter.length ; i++) {
        myCounter[i].innerHTML=('0'+counterArray[i]).slice(-2);
    }

}

function setCounter() {
    var counterInput;
    counterInput=document.getElementById("newOpenDate").value;
    newOpen=parseYMDHM(counterInput);
}
