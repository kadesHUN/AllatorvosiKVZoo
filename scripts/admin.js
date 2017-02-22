
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

// Számláló megjelenítése

function myTimer() {
    var myCounter;
    var counterArray=[];
    counterArray=dateCounter(newOpen);
    myCounter = document.getElementsByClassName("counterBig");
    for (var i=0; i<myCounter.length ; i++) {
        myCounter[i].innerHTML=('0'+counterArray[i]).slice(-2);
    }

}

// Vissaszámlló beállítása

function setCounter() {
    var counterInput;
    counterInput=document.getElementById("newOpenDate").value;
    newOpen=parseYMDHM(counterInput);
}

// bejelentkezési adatok ellenőrzése
// - login ablak törlése
// - ikon bejelentkezettre állítása
// - menüpont hozzáadása az oldalsó menühöz
// - admin oldal megjelenítése

function login() {
    var userName;
    var userPassword;
    var node;
    var textnode;

    userName=event.target.parentElement.children[2].value;
    userPassword=event.target.parentElement.children[4].value;
    node = document.createElement("li");
    textnode = document.createTextNode("Adminisztráció");

    if (userName=='admin' && userPassword=='admin'){
        loggedIn=true;
        document.getElementById('loggedInIco').innerHTML='person_outline';
        node.appendChild(textnode);
        document.querySelector('ul').appendChild(node);
        document.querySelector('.loginContainer').style.display='none';
        document.querySelector('.loginBackground').style.display='none';

    } else {
        alert('Hibás felhasználónév vagy jelszó!');
    }   
}


//Eljárás tetszőleges mélységű rendezés megvalósítására a JS array.sort funkciójának használatával
//a függvény vissztérési értéka a rendezett tömb
//@jsonData - JSON-ben a rendezendő kávék
//@sortByArray - rendezési szempontok tömbbe rendezve a tömb elemeinek egyezniük kell a kapott
//               jsonData kulcsaival

function generalArraySort (jsonData,sortByArray) {
    var result;
    result=jsonData.sort(function(first, second){
        for (var i=0; i<sortByArray.length ; i++){
            first[sortByArray[i]]=first[sortByArray[i]].toString();
            second[sortByArray[i]]=second[sortByArray[i]].toString();
            switch (first[sortByArray[i]].localeCompare(second[sortByArray[i]])) {
                case 1 : 
                    return 1;
                case -1  :
                    return -1;
            }
        } 
    });
    
    return result;
}

function minStockFilter() {
    var coffeeStockFiltered;
    var filterValue;
    var order;
    order = ['stock','brand'];
    filterValue=document.getElementById('minStock').value;
    coffeeStockFiltered=coffee.filter(function (arrayItem){
        if (arrayItem.stock<=filterValue) {
            return true;
        }
    });
    coffeeStockFiltered=generalArraySort(coffeeStockFiltered,order);
    showCoffeTable(coffeeStockFiltered,tableStyle3,'div3',false);
}



function showLoginWindow(param) {
    if (!loggedIn && param) {
        document.querySelector('.loginContainer').style.display='block';
        document.querySelector('.loginBackground').style.display='block';
    } else {
        document.querySelector('.loginContainer').style.display='none';
        document.querySelector('.loginBackground').style.display='none';        
    }
}
