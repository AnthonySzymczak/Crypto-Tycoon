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

//
//  VIDEO CARDS
//
//_____________________________________________________________________________________
//tony's play area

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

//
//  PROCESSORS
//
let elem7 = document.getElementById('7');
elem7.value = 200;
elem7.addEventListener('click', subtractUSD);

let elem8 = document.getElementById('8').append.val=300;

let elem9 = document.getElementById('9').append.val=400;

let elem10 = document.getElementById('10').append.val=800;

let elem11 = document.getElementById('11').append.val=1500;

let elem12 = document.getElementById('12').append.val=5000;

//
//  MOTHER BOARDS
//
let elem13 = document.getElementById('13').append.val=150;

let elem14 = document.getElementById('14').append.val=250;

let elem15 = document.getElementById('15').append.val=350;

let elem16 = document.getElementById('16').append.val=700;

let elem17 = document.getElementById('17').append.val=2000;

let elem18 = document.getElementById('18').append.val=5000;



function subtractUSD() {
    console.log('subtractUSD');        
    for (i = usdConversion; 1 <= 18; val--) {
    }
}

