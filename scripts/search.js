// a div1-ben található ország csoport fejlécek kigyűjtés a táblázatból
// a gyűjtés után egy plusz osztály hozzáadása a kiválasztott elemekhez

function addCalassToGroupedTable() {
    var rows;
    rows=document.querySelectorAll('#div1 table tbody tr td[colspan="3"]');
    for (var i=0; i<rows.length ; i++) {
        rows[i].classList.add('centered');
    }
}

// az új-nak számító elemek megjelölése, hogy a későbbiekben könnyebben 
// szűrhetőek/módosíthatóak legyenek


function addNewAttribByData(newFromDate,param) {
    var rows;
    rows=document.querySelectorAll('#div1 table tbody tr td:first-child:not([colspan="3"])');
    for (var i=0 ; i<rows.length ; i++) {
        for (var j=0; j<coffee.length; j++) {
            console.log(rows[i].innerHTML,coffee[j].brand);
            if (rows[i].parentElement.children[param].innerHTML==coffee[j].brand) {
                if (coffee[j].added<newFromDate){
                    rows[i].parentElement.setAttribute('data-isnew','true');
                    break;
                }
            }
        }
    }
}

// az újnak jelölt elemekhez plusz osztály felvitele

function highlightNew() {
    var rows;
    rows=document.querySelectorAll('#div1 table tbody tr[data-isnew="true"]');
    for (var i=0; i<rows.length ; i++) {
        rows[i].classList.add('highlight');
    }
}

// a réginek számító elemek eltüntetése

function hideOld() {
    var rows;
    rows=document.querySelectorAll('#div1 table tbody tr:not([data-isnew="true"]) td:first-child:not([colspan="3"])');
    for (var i=0; i<rows.length ; i++) {
        rows[i].parentElement.remove();
    }
}

//csoprtosítás nézetben az üresen álló országok törlése

function hideUnnecessaryCountry(){
    var rows;
    rows=document.getElementsByClassName('centered'); 
    for (var i=0 ; i<rows.length ; i++) {
       if (rows[i].parentElement.nextSibling.getAttribute('data-isnew')!='true') {
           rows[i].parentElement.remove();
           i--;
       } 
    }
}

function newsNextHandler(){
    nextSearchWindowPointer++;
    if (nextSearchWindowPointer==3) {
        nextSearchWindowPointer=0;
    }    
    newsDivGenerator();
}

function newsDivGenerator (){
    var groupByCountry;
    var actSearchType;
    var newsNext;
    groupByCountry=document.getElementById('groupByCountry').checked;
    actSearchType=nextSearchWindowPointer-1 ;
    newsNext=document.getElementById('newsNext');
    newsNext.innerHTML=searchWindow[nextSearchWindowPointer];

    if (actSearchType==-1) {
        actSearchType=2;
    }
    showCoffeTable(coffee,tableStyle2,'div1',groupByCountry);
    addCalassToGroupedTable();
    (groupByCountry) ? addNewAttribByData('2017.01.01',0) : addNewAttribByData('2017.01.01',1);
    switch (actSearchType) {
        case 1:
            highlightNew();
            break;
        case 2:
            highlightNew();
            hideOld();
            if (actSearchType) { 
                hideUnnecessaryCountry(); 
            }
            break;
    }

}