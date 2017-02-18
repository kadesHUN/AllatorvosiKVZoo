// Ez a keresés nem túl hatékony majd cserélni!

function priceOfCoffee (name){
    for (var i=0; i<coffee.length ; i++){
        if (coffee[i].brand==name) {
            return (coffee[i].sale_price)
        } 
    }
    return -1;
}

function createBasketTable(){
    var basketSorted=generalOrder(basket,order2);
    var basketGrouped=[];
    var counter=1;
    var temp={};
    var total=0;
    var tableStyle={brand:'Márka', sale_price:'Fogyasztói ár' , piece:'Darab' , sub_total:'Részösszesen'};
    basketSorted=basketSorted.map(function(currentItem){return currentItem;});
    basketSorted.push({brand:''});
    for (var i=0 ; i<basketSorted.length-1; i++ ){
        if (basketSorted[i]['brand']==basketSorted[i+1]['brand']) {
            counter++;
        }  else {
            temp={};
            temp.brand=basketSorted[i].brand;
            temp.piece=counter;
            temp.sale_price=priceOfCoffee(basketSorted[i].brand);
            temp.sub_total=(temp.piece*temp.sale_price);
            total+=temp.sub_total;
            temp.piece+=' db';
            temp.sale_price+=' Ft';
            temp.sub_total+=' Ft';
            basketGrouped.push(temp);
            counter=1;
        }     
    }
  showCoffeTable(basketGrouped,tableStyle,'basketContainer',false);  
  document.getElementById('total').innerHTML=total;
}

function showBasket() {
	showBasketContainer(true);
    createBasketTable();
}

function showBasketContainer(show){
	var displayValue;
	if (show) { displayValue='inline-block';} else {displayValue='none';}
	document.getElementById('basketContainer').style.display=displayValue;
	document.getElementById('basketBackground').style.display=displayValue;
}

function updateBasketIcon(){
	var basketCounter=document.getElementById('basketCounter');
	basketCounter.innerHTML=basket.length;
}

// Bevásárlókosár hozzáadása a KV-khoz
// @divID - melyik ID-ban található táblázathoz adja hozzá a bevásárlókosarkat

function addBasketsToTable (divID) {
	var rowHead =document.querySelector('#'+divID+' table thead tr');
	var rowsBody=document.querySelectorAll('#'+divID+' table tbody tr');
	var insertThis='<i class="material-icons md-18">shopping_cart</i>';
	var cell=rowHead.insertCell();
	cell.innerHTML='';
	for (var i=0; i<rowsBody.length ; i++) {
		cell=rowsBody[i].insertCell();
		cell.innerHTML=insertThis;
	}
}

//OnClick események kezelésének felpakolása minden bevásárlókorra
//@divID -  melyik ID-ban található a táblázat

function addEventLstnrToBaskets (divID) {
    
	var allBaskets= document.querySelectorAll('td i');
	for (var i=0; i<allBaskets.length ; i++){
		allBaskets[i].addEventListener('click', 
			function(ev) {
                var temp={};
                temp.brand=ev.target.parentNode.parentNode.children[0].innerHTML;
				basket.push(temp);
				updateBasketIcon();
			});
	}
}