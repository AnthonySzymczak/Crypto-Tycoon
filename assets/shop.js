/* In this .js file you will see an interactive shop user interface 
    you will notice many purchaseable upgrades */

//-----------------------------------------------
//  VIDEO CARDS
//-----------------------------------------------

let elem1 = document.getElementById("1");
elem1.dataset.dollar = 125;
elem1.addEventListener("click", subtractUSD);
console.log(elem1);

let elem2 = document.getElementById("2");
elem2.dataset.dollar = 300;
elem2.addEventListener("click", subtractUSD);

let elem3 = document.getElementById("3");
elem3.dataset.dollar = 650;
elem3.addEventListener("click", subtractUSD);

let elem4 = document.getElementById("4");
elem4.dataset.dollar = 1300;
elem4.addEventListener("click", subtractUSD);

let elem5 = document.getElementById("5");
elem5.dataset.dollar = 2600;
elem5.addEventListener("click", subtractUSD);

let elem6 = document.getElementById("6");
elem6.dataset.dollar = 5000;
elem6.addEventListener("click", subtractUSD);

//------------------------------------------------
//  PROCESSORS
//------------------------------------------------

let elem7 = document.getElementById("7");
elem7.dataset.dollar = 200;
elem7.addEventListener("click", subtractUSD);

let elem8 = document.getElementById("8");
elem8.dataset.dollar = 300;
elem8.addEventListener("click", subtractUSD);

let elem9 = document.getElementById("9");
elem9.dataset.dollar = 400;
elem9.addEventListener("click", subtractUSD);

let elem10 = document.getElementById("10");
elem10.dataset.dollar = 800;
elem10.addEventListener("click", subtractUSD);

let elem11 = document.getElementById("11");
elem11.dataset.dollar = 125;
elem11.addEventListener("click", subtractUSD);

let elem12 = document.getElementById("12");
elem12.dataset.dollar = 5000;
elem12.addEventListener("click", subtractUSD);

//--------------------------------------------------
//  MOTHER BOARDS
//--------------------------------------------------

let elem13 = document.getElementById("13");
elem13.dataset.dollar = 150;
elem13.addEventListener("click", subtractUSD);

let elem14 = document.getElementById("14");
elem14.dataset.dollar = 250;
elem14.addEventListener("click", subtractUSD);

let elem15 = document.getElementById("15");
elem15.dataset.dollar = 350;
elem15.addEventListener("click", subtractUSD);

let elem16 = document.getElementById("16");
elem16.dataset.dollar = 700;
elem16.addEventListener("click", subtractUSD);

let elem17 = document.getElementById("17");
elem17.dataset.dollar = 2000;
elem17.addEventListener("click", subtractUSD);

let elem18 = document.getElementById("18");
elem18.dataset.dollar = 5000;
elem18.addEventListener("click", subtractUSD);

function subtractUSD(event) {
    localStorage.getItem("USD-held");
    console.log(usdConversion);
  var elem = event.target;
  let dollar = parseFloat(elem.dataset.dollar);

  
  if (usdConversion < elem) {
      // You cannot purchase this upgrade, you do not have enough money!;
      console.log("not enough moolah baaaybay");
      return;
    } 
    else{
        usdConversion - dollar;
        localStorage.setItem("USD-held",usdConversion);
    }
  // needs to save to local storage,
  //if you want to do it again, it needs to pull from local storage.
}
