"use strict";

//Eljárás tetszőleges mélységű rendezés megvalósítására
//@jsonData - JSON-ben a rendezendő kávék
//@sortByArray - rendezési szempontok tömbbe rendezve a tömb elemeinek egyezniük kell a kapott
//               jsonData kulcsaival



function generalOrder(jsonData,sortByArray) {
    //console.log(sortByArray);
    if (sortByArray.length==0) {
        return jsonData;
    }
	var temp=[];
    var sortByArrayTemp=[];
	for (var i=0; i<jsonData.length-1;i++) {
		for (var j=i+1; j<jsonData.length;j++){
            temp=[jsonData[i],jsonData[j]];
			if (jsonData[i][sortByArray[0]].localeCompare(jsonData[j][sortByArray[0]])>0){				
				jsonData[i]=temp[1];
				jsonData[j]=temp[0];
			} else if (jsonData[i][sortByArray[0]].localeCompare(jsonData[j][sortByArray[0]])==0) {
                sortByArrayTemp=sortByArray.map(function(currentItem){return currentItem;});
                sortByArrayTemp.shift();
                temp=generalOrder(temp,sortByArrayTemp);
                jsonData[i]=temp[0];
                jsonData[j]=temp[1];
			}
		}
	}
    return jsonData;	
}

// Eljárás a kávé táblázatok megjelenítésére
// @jsonData - JSON-ben a megjelenítendő obejektum
// @jsonHeader - JSON-ben a megjelenítendő táblázat fejléce 
// @divID - melyik ID-jű divben található a táblázat 
// @isGrouped - Boolean -  a jsonHeader-ben kapott első elem alapján csoportba rendezi a táblázatot. Előfeltétel, hogy a 
//                         táblázat erre a paraméterre rendezett legyen 



function showCoffeTable(jsonData,jsonHeader,divID,isGrouped){

	function withoutGroup(){
		for (var i=0 ; i<jsonData.length ; i++){
			row=tableBody.insertRow();
			for (var j=0; j<jsonHeaderKeys.length ; j++) {
				item=row.insertCell();
				item.innerHTML=jsonData[i][jsonHeaderKeys[j]];
			}
		}
	}


	function withGroup (){
		var firstHeadField;
		var	temp={};
		firstHeadField=document.querySelector('#div1 table thead tr td');
		firstHeadField.remove();
		for (var i=0 ; i<jsonHeaderKeys.length ; i++) {
			temp[jsonHeaderKeys[i]]='';
		}
		jsonData.unshift(temp);
		for (i=1 ; i<jsonData.length ; i++) {
			row=tableBody.insertRow();
			if (jsonData[i][jsonHeaderKeys[0]]!=jsonData[i-1][jsonHeaderKeys[0]]) {
				item=row.insertCell();
				item.innerHTML=jsonData[i][jsonHeaderKeys[0]];
				item.colSpan=jsonHeaderKeys.length-1;
				row=tableBody.insertRow();
			} 
			for (var j=1; j<jsonHeaderKeys.length ; j++) {
				item=row.insertCell();
				item.innerHTML=jsonData[i][jsonHeaderKeys[j]];				
			}
		}
	}

	var tableHead='';
    var tableBody=''
	var row='';
	var item='';
	var jsonHeaderKeys=[];
	jsonData=jsonData.map(function(currentItem){return currentItem;});
    
    tableHead=document.querySelector('#'+divID+' table thead');
    tableBody=document.querySelector('#'+divID+' table tbody');
    tableHead.innerHTML='';
    tableBody.innerHTML='';
	jsonHeaderKeys=Object.keys(jsonHeader);

    //THEAD elkészítése 
    row=tableHead.insertRow();
    for (var i in jsonHeader){
        item=row.insertCell();
        item.innerHTML=jsonHeader[i];
    }
	if (isGrouped) {
		withGroup();
	} else {
		withoutGroup();
	}
    //TBODY elkészítése
    

}


// ----------------------------------------------------------------------------------------------------------------------

//Változók definiálása
//@coffee - Kávék adatainak leírása a barand minden esetben egyedi
//@adminLogedIn - változó 
var coffee=[{brand:"Alfredo" , country:"Ukrajna" , strong:2, stock:6, purcase_price:100, sale_price:250,added:'2017.01.12'},
		{brand:"Café Rosé " , country:"Zambia" , strong:6, stock:10, purcase_price:120, sale_price:247,added:'2017.02.02'},
		{brand:"Dolce Gusto" , country:"Zambia" , strong:8, stock:1, purcase_price:105, sale_price:297,added:'2016.04.30'},
		{brand:"Ganoderma" , country:"Dél-Oszétia" , strong:2, stock:2, purcase_price:130, sale_price:254,added:'2016.03.07'},
		{brand:"Hausbrandt" , country:"Gambia" , strong:9, stock:8, purcase_price:140, sale_price:281,added:'2017.05.10'},
		{brand:"Hessont" , country:"Jemen" , strong:10, stock:0, purcase_price:136, sale_price:299,added:'2017.02.21'},
		{brand:"Il MOretto" , country:"Mexikó" , strong:6, stock:5, purcase_price:148, sale_price:249,added:'2015.03.05'},
		{brand:"Jacobs" , country:"Dél-Oszétia" , strong:7, stock:3, purcase_price:145, sale_price:246,added:'2016.01.20'},
		{brand:"Lamborghini" , country:"Svájc" , strong:7, stock:9, purcase_price:199, sale_price:234,added:'2017.10.06'},
		{brand:"Lazzarin " , country:"Chile" , strong:7, stock:11, purcase_price:134, sale_price:222,added:'2017.04.08'},
		{brand:"Merillo" , country:"Svájc" , strong:5, stock:3, purcase_price:184, sale_price:264,added:'2016.08.15'},
		{brand:"MoKambo" , country:"Svájc" , strong:10, stock:5, purcase_price:111, sale_price:296,added:'2016.08.16'},
		{brand:"Nespresso" , country:"Algéria" , strong:6, stock:8, purcase_price:143, sale_price:264,added:'2015.04.20'},
		{brand:"Old Chicago" , country:"Fülöp-szigetek" , strong:4, stock:3, purcase_price:155, sale_price:277,added:'2016.10.20'},
		{brand:"Omnia" , country:"Amerikai Szamoa" , strong:9, stock:6, purcase_price:195, sale_price:245,added:'2015.03.24'},
		{brand:"Pellini" , country:"Svájc" , strong:1, stock:25, purcase_price:154, sale_price:253,added:'2017.06.24'},
		{brand:"Folgers" , country:"Dzsibuti" , strong:6, stock:2, purcase_price:134, sale_price:234,added:'2016.01.23'},
        {brand:"Gevalia" , country:"Costa Rica" , strong:6, stock:2, purcase_price:134, sale_price:234,added:'2013.03.25'},
        {brand:"Ringtons Tea" , country:"Ukrajna" , strong:6, stock:2, purcase_price:134, sale_price:234,added:'2015.01.05'},
        {brand:"Senseo" , country:"Ukrajna" , strong:6, stock:2, purcase_price:134, sale_price:234,added:'2015.11.18'},
        {brand:"Barcaffe" , country:"Dzsibuti" , strong:6, stock:2, purcase_price:134, sale_price:234,added:'2014.05.08'},
        {brand:"Löfbergs" , country:"Mauritius" , strong:6, stock:2, purcase_price:134, sale_price:234,added:'2015.12.08'},
        {brand:"Delta Cafés" , country:"Costa Rica" , strong:6, stock:2, purcase_price:134, sale_price:234,added:'2013.03.22'},
        {brand:"Coffee Alley" , country:"Ukrajna" , strong:6, stock:2, purcase_price:134, sale_price:234,added:'22017.04.26'},
        {brand:"Senseo" , country:"Costa Rica" , strong:6, stock:2, purcase_price:134, sale_price:234,added:'2011.08.30'},
        {brand:"Ziferblat" , country:"Mauritius" , strong:6, stock:2, purcase_price:134, sale_price:234,added:'2017.02.09'}];

var adminLogedIn=false;
var actualDiv='';
var basket=[];
var tableStyle1={brand:'Márka' , country:'Származási ország' , strong:'Erőssége' , stock:'Készlet'};
var tableStyle2={country:'Származási ország' , brand:'Márka' , strong:'Erőssége' , stock:'Készlet'};

var order1=['country','brand'];
var order2=['brand'];

var searchWindow=['Mutass minden elemet','Emeld ki az újakat','Csak az újakat mutasd'];
var nextSearchWindowPointer=1;
// ----------------------------------------------------------------------------------------------------------------------
// Induláskor lefutó 

// div0 generálás
coffee=generalOrder(coffee,order1);
showCoffeTable(coffee,tableStyle1,'div0',false);
addBasketsToTable('div0');
addEventLstnrToBaskets('div0');

//div1 generálás

// showCoffeTable(coffee,tableStyle2,'div1',true);
//addCalassToGroupedTable();
//addNewAttribByData('2017.01.01',0);
//highlightNew();
//hideOld();
//hideUnnecessaryCountry();
newsDivGenerator();
