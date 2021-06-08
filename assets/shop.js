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
let usdConversion = [];
document.getElementById('1').val='125';
document.getElementById('2').val='300';
document.getElementById('3').val='650';
document.getElementById('4').val='1300';
document.getElementById('5').val='2600';
document.getElementById('6').val='5000';
//
//  PROCESSORS
//
document.getElementById('7').val='200';
document.getElementById('8').val='300';
document.getElementById('9').val='400';
document.getElementById('10').val='800';
document.getElementById('11').val='1500';
document.getElementById('12').val='5000';
//
//  MOTHER BOARDS
//
document.getElementById('13').val='150';
document.getElementById('14').val='250';
document.getElementById('15').val='350';
document.getElementById('16').val='700';
document.getElementById('17').val='2000';
document.getElementById('18').val='5000';