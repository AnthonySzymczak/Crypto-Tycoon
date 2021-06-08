/* In this .js file you will see an interactive shop user interface 
    you will notice a clean interface with many purchaseable upgrades */



//Savebutton/ local storage setup
/*
$(".button").on("click",function(){
    for(let i=1; i <= 18; i++)
    save(i);
})




let storedItem = localStorage.getItem("storedItem");

function save(i){
    let item = (document.getElementById("text" +i).value);
    console.log(item);
    localStorage.setItem("storedItem" +i, item);
    
    console.log(storedItem);
}

function get(){
    for( i=1; i <= 18;i++){
        let item = (document.getElementById("text" +i));
        let returnItem = localStorage.getItem("storedItem" +i);
        item.value = returnItem;
        console.log(returnItem);
    }
}
get();
*/

//-----------------------------------------------
//  VIDEO CARDS
//-----------------------------------------------

let elem1 = document.getElementById('1');
elem1.value = 125;
elem1.addEventListener('click', subtractUSD);

let elem2 = document.getElementById('2');
elem2.value = 300;
elem2.addEventListener('click', subtractUSD);

let elem3 = document.getElementById('3');
elem3.value = 650;
elem3.addEventListener('click', subtractUSD);

let elem4 = document.getElementById('4');
elem4.value = 1300;
elem4.addEventListener('click', subtractUSD);

let elem5 = document.getElementById('5');
elem5.value = 2600;
elem5.addEventListener('click', subtractUSD);

let elem6 = document.getElementById('6');
elem6.value = 5000;
elem6.addEventListener('click', subtractUSD);

//------------------------------------------------
//  PROCESSORS
//------------------------------------------------

let elem7 = document.getElementById('7');
elem7.value = 200;
elem7.addEventListener('click', subtractUSD);

let elem8 = document.getElementById('8');
elem8.value = 300;
elem8.addEventListener('click', subtractUSD);

let elem9 = document.getElementById('9');
elem9.value = 400;
elem9.addEventListener('click', subtractUSD);

let elem10 = document.getElementById('10');
elem10.value = 800;
elem10.addEventListener('click', subtractUSD);

let elem11 = document.getElementById('11');
elem11.value = 125;
elem11.addEventListener('click', subtractUSD);

let elem12 = document.getElementById('12');
elem12.value = 5000;
elem12.addEventListener('click', subtractUSD);

//--------------------------------------------------
//  MOTHER BOARDS
//--------------------------------------------------

let elem13 = document.getElementById('13');
elem13.value = 150;
elem13.addEventListener('click', subtractUSD);

let elem14 = document.getElementById('14');
elem14.value = 250;
elem14.addEventListener('click', subtractUSD);

let elem15 = document.getElementById('15');
elem15.value = 350;
elem15.addEventListener('click', subtractUSD);

let elem16 = document.getElementById('16');
elem16.value = 700;
elem16.addEventListener('click', subtractUSD);

let elem17 = document.getElementById('17');
elem17.value = 2000;
elem17.addEventListener('click', subtractUSD);

let elem18 = document.getElementById('18');
elem18.value = 5000;
elem18.addEventListener('click', subtractUSD);


/*
function subtractUSD() {
    console.log('subtractUSD');        
    for (i = usdConversion; i <= 18; value--) {

    }
}
*/
