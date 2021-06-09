//DOGE - DOGE COIN BTC - BITCOIN ETH - ETHEREUM
//CONSTANTS
const API_KEY =
  "0a4a30fd69c551af6529573e0770da441e7496f29fade17e52b1b78e221a3444";
const CURRENCIES = "USD";
const SAVED_VARIABLES = 2;
const CRYPTOCURRENCIES_CONVERSION = "DOGE,ETH,BTC";
const CRYPTOCURRENCIES_TREND = "doge-dogecoin,eth-ethereum,btc-bitcoin";
const DECIMAL_POINTS = 2;
const TWEETS = 3;
const CONVERSION_RATE = .90;
//JQUERY ID REFERENCES CONTAINERS
var gamePage = $("#gamePage");
var shopPage = $("#shopContainer");
var strtPage = $("#crypto");
var howtoPlayPage = $("#howToPlaypge");
var dogeContainer = $("#dogeGod");
//JQUERY ID REFERENCES BTNS
var strtbtn = $("#startGame");
var shopBtn = $("#shopBtn");
var homeBtn = $("#homeBtn");
var HTPbtn = $("#HTPbtn");
var dogeBtn = $("#superDoge");


//API KEYS, APIs USED, Cryptocompare, Coinpaprika
var CRYPTO_USD_PRICE_API = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${
  CRYPTOCURRENCIES_CONVERSION.split(",")[0]
}&tsyms=${CURRENCIES}&api_key=${API_KEY}`;
var CRYPTO_TREND_API = `https://api.coinpaprika.com/v1/tickers/${
  CRYPTOCURRENCIES_TREND.split(",")[0]
}/`;
var CRYPTO_TWITTER_API = `https://api.coinpaprika.com/v1/coins/${
  CRYPTOCURRENCIES_TREND.split(",")[0]
}/twitter`;

var DOGE_HASHRATE = 1.0;
var usdConversion = 0;
var cryptoHeld = 0;
var clickCount = 0;
testHeader();
cryptoTwitter(CRYPTO_TWITTER_API);
//on load displays homepage and hides other pages
gamePage.hide();
shopPage.hide();
howtoPlayPage.hide();
// on click loads game page
strtbtn.click(loadGamePage);
function loadGamePage() {
  strtPage.hide();

  gamePage.show();
  shopPage.hide();
  $("doge").hide()
  howtoPlayPage.hide();
}
//from nav bar on click loads homepage
homeBtn.click(loadHomePage);
function loadHomePage() {
  strtPage.show();
  gamePage.hide();
  shopPage.hide();
  howtoPlayPage.hide();
  $("doge").hide()
}
// from nav bar on click loads shop
shopBtn.click(loadShopPage);
function loadShopPage() {
  shopPage.show();
  gamePage.hide();
  strtPage.hide();
  howtoPlayPage.hide();
  $("doge").hide()
}
//nav bar on click loads HTP page
HTPbtn.click(loadHTPpge);
function loadHTPpge() {
  howtoPlayPage.show();
  shopPage.hide();
  gamePage.hide();
  strtPage.hide();
  $("doge").hide()
}

//loads god
dogeBtn.click(loadGod);
function loadGod() {
  strtPage.hide();
  gamePage.hide();
  shopPage.hide();
  howtoPlayPage.hide();
  $("<img>")
    .attr({
        id: "doge",
      src: "./assets/imagesDogedudefrontpage.jpg",
    })
    .appendTo("#dogeGod");
}

function cryptoTwitter(CRYPTO_TWITTER_API) {
  fetch(CRYPTO_TWITTER_API)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      twitterContainer()
      for (var i = 0; i < TWEETS; i++) {
        const {
          date,
          like_count,
          media_link,
          retweet_count,
          status,
          user_image_link,
          user_name,
        } = data[i];

        var splitMedia = media_link.split("/");
        if (splitMedia.indexOf("media") == -1) {
          var isVideo = 1;
        } else {
          isVideo = 0;
        }
        var conversionDate = new Date(date);
        conversionDate = conversionDate.toLocaleDateString("en-US");
        twitterFeed(
          i,
          {
            conversionDate,
            like_count,
            media_link,
            retweet_count,
            status,
            user_image_link,
            user_name,
          },
          isVideo
        );
      }
    });
}
function cryptoTrends(CRYPTO_TREND_API) {
  fetch(CRYPTO_TREND_API)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const { percent_change_15m, percent_change_1h, percent_change_24h } =
        data.quotes.USD;
      dogeTicker({ percent_change_15m, percent_change_1h, percent_change_24h });
    });
}
function dogeTicker(data) {
  $("#innerMarquee15m").text(data.percent_change_15m + "%");
  $("#innerMarquee1h").text(data.percent_change_1h + "%");
  $("#innerMarquee1d").text(data.percent_change_24h + "%");
  if (data.percent_change_15m > 0) {
    $("#innerMarquee15m")
      .removeClass("negativeChange neutralChange")
      .addClass("positiveChange");
  } else if (data.percent_change_15m < 0) {
    $("#innerMarquee15m")
      .removeClass("positiveChange neutralChange")
      .addClass("negativeChange");
  } else {
    $("#innerMarquee15m")
      .removeClass("positiveChange negativeChange")
      .addClass("neutralChange");
  }
  if (data.percent_change_1h > 0) {
    $("#innerMarquee1h")
      .removeClass("negativeChange neutralChange")
      .addClass("positiveChange");
  } else if (data.percent_change_1h < 0) {
    $("#innerMarquee1h")
      .removeClass("positiveChange neutralChange")
      .addClass("negativeChange");
  } else {
    $("#innerMarquee1h")
      .removeClass("positiveChange negativeChange")
      .addClass("neutralChange");
  }
  if (data.percent_change_24h > 0) {
    $("#innerMarquee1d")
      .removeClass("negativeChange neutralChange")
      .addClass("positiveChange");
  } else if (data.percent_change_24h < 0) {
    $("#innerMarquee1d")
      .removeClass("positiveChange neutralChange")
      .addClass("negativeChange");
  } else {
    $("#innerMarquee1d")
      .removeClass("positiveChange negativeChange")
      .addClass("neutralChange");
  }
}
//FETCH API THAT CONVERTS ON CLICK AND RETURNS SUM OF cryptoHeld + usdConversion
//ALSO SHOWS AMOUNT CONVERTED ON CLICK AND CURRENT DOGE PRICE
function cryptoToUSD(CRYPTO_USD_PRICE_API) {
  fetch(CRYPTO_USD_PRICE_API)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentPrice = data.DOGE.USD.toFixed(DECIMAL_POINTS);
      $("#cryptoPrice").text(
        "The Current Price of Doge Coin is: $" + currentPrice + " per coin"
      );
      $("#currentUSD").text("");
      $("#currentUSD").text(
        "You have converted " +
          cryptoHeld +
          " Doge Coin to $" +
          conversionAmount(currentPrice, cryptoHeld).toFixed(DECIMAL_POINTS) +
          "\nYour Total is: $" +
          conversionTotal(currentPrice, cryptoHeld).toFixed(DECIMAL_POINTS) +
          " Dollars with a 10% tax"
      );
    });
}
//LOAD STORE SECTION, LOADS AND STORES clickCount AND usdConversion
function storeCurrency() {
  localStorage.setItem("crypto-held", clickCount);
  localStorage.setItem("USD-held", usdConversion);
  localStorage.setItem("hashRate", DOGE_HASHRATE);
}
function loadCurrency() {
  clickCount = loadClicks();
  usdConversion = loadUSDConversion();
  DOGE_HASHRATE = loadHashRate();
  console.log(clickCount,usdConversion)
  displayCurrentValues(clickCount, usdConversion);
}
function loadClicks() {
  var clickCount = localStorage.getItem("crypto-held");
  return clickCount;
}
function loadUSDConversion() {
  var usdConversion = localStorage.getItem("USD-held");
  usdConversion = parseFloat(usdConversion);
  return usdConversion;
}
function loadHashRate() {
  var DOGE_HASHRATE = localStorage.getItem("hashRate");
  DOGE_HASHRATE = parseFloat(DOGE_HASHRATE);
  return DOGE_HASHRATE;
}
//CONVERTS AND DISPLAYS UPDATED clickCount and usdConversion FROM LOCAL STORAGE
function displayCurrentValues(clickCount, usdConversion) {
  usdConversion = parseFloat(usdConversion);
  $("#currentUSD").text(
    "Dollars Available: $" + usdConversion.toFixed(DECIMAL_POINTS)
  );
  cryptoHeld = convertDoge(clickCount);
  $("#currentCrypto").text("Doge Coins:" + cryptoHeld);
}
//TEST HEADER TO DISPLAY on.("click") FUNCTIONALITY, CAN BE DELETED ONCE GAME
//PAGE HAS BEEN CREATED AND ID's CORRECTLY REFERENCED.
function testHeader() {
  $("<header>").attr({ id: "gamePage" }).appendTo(document.body);
  $("<h3>").attr({ id: "cryptoPrice" }).appendTo("#gamePage");
  $("<h2>")
    .text("Dollars Available: $" + usdConversion.toFixed(DECIMAL_POINTS))
    .attr({ id: "currentUSD" })
    .appendTo("#gamePage");
  $("<h2>")
    .text("Doge Coins:" + cryptoHeld)
    .attr({ id: "currentCrypto" })
    .appendTo("#gamePage");
  $("<h1>")
    .text("ClickHere")
    .attr({ id: "increment" })
    .appendTo("#gamePage");
  //PUT FUNCTION HERE FOR GAME PAGE CLICKS^ DELETE ABOVE h1  
  gameButtonContainer()
}
function gameButtonContainer(){
  $("<div>").attr({"id":"buttonContainer","class":"begin"}).appendTo("#gamePage")
  $("<button>").attr({"id":"convert", "class":"btn"}).text("Convert").appendTo("#buttonContainer")
  $("<button>").attr({"id":"save", "class":"btn"}).text("Save").appendTo("#buttonContainer")
}
function twitterContainer() {
  $("<aside>").attr({"id":"aside","class":"asideContainer"}).appendTo("#gamePage")
  $("<marquee>").attr({"id":"marquee2","class":"grids row","direction":"up"}).appendTo("#aside")
}
function twitterFeed(i, data, isVideo) {
  $("<div>")
    .attr({ id: "twitterContainer" + i, class: "card" })
    .appendTo("#marquee2");
  $("<header>")
    .attr({ id: "twitterHeader" + i, class: "card-header" })
    .appendTo("#twitterContainer" + i);
  $("<img>")
    .attr({
      id: "twitterHeaderIcon" + i,
      class: "card-header-icon",
      src: data.user_image_link,
    })
    .appendTo("#twitterHeader" + i);
  $("<p>")
    .text(data.user_name)
    .attr({ id: "twitterHeaderTitle" + i, class: "card-header-title" })
    .appendTo("#twitterHeader" + i);
  $("<div>")
    .attr({ id: "twitterContentContainer" + i, class: "card-content" })
    .appendTo("#twitterContainer" + i);
  $("<p>")
    .text(data.status)
    .attr({ id: "twitterContent" + i, class: "content" })
    .appendTo("#twitterContentContainer" + i);

  twitterMedia(i, data, isVideo);
  $("<footer>")
    .attr({ id: "twitterFooterContainer" + i, class: "card-footer" })
    .appendTo("#twitterContainer" + i);
  $("<p>")
    .text("Retweets:" + data.retweet_count)
    .attr({ id: "twitterRT" + i, class: "card-footer-item" })
    .appendTo("#twitterFooterContainer" + i);
  $("<p>")
    .text("Likes:" + data.like_count)
    .attr({ id: "twitterFooterLikes" + i, class: "card-footer-item" })
    .appendTo("#twitterFooterContainer" + i);
  $("<p>")
    .text(data.conversionDate)
    .attr({ id: "twitterFooterDate" + i, class: "card-footer" })
    .appendTo("#twitterContainer" + i);
}
function twitterMedia(i, data, isVideo) {
  if (isVideo == 1) {
    $("<img>").remove();
    $("<video>")
      .attr({ id: "twitterVideo", class: "card-image", src: data.media_link })
      .appendTo("#twitterContentContainer" + i);
  } else if (isVideo == 0) {
    $("<video>").remove();
    $("<img>")
      .attr({ id: "twitterImage", class: "card-image", src: data.media_link })
      .appendTo("#twitterContentContainer" + i);
  }

  twitterMedia(i, data, isVideo);
  $("<footer>")
    .attr({ id: "twitterFooterContainer" + i, class: "card-footer" })
    .appendTo("#twitterContainer" + i);
  $("<p>")
    .text("Retweets:" + data.retweet_count)
    .attr({ id: "twitterRT" + i, class: "card-footer-item" })
    .appendTo("#twitterFooterContainer" + i);
  $("<p>")
    .text("Likes:" + data.like_count)
    .attr({ id: "twitterFooterLikes" + i, class: "card-footer-item" })
    .appendTo("#twitterFooterContainer" + i);
  $("<p>")
    .text(data.conversionDate)
    .attr({ id: "twitterFooterDate" + i, class: "card-footer" })
    .appendTo("#twitterContainer" + i);
}
function twitterMedia(i, data, isVideo) {
  if (isVideo == 1) {
    $("<img>").remove();
    $("<video>")
      .attr({ id: "twitterVideo", class: "card-image", src: data.media_link })
      .appendTo("#twitterContentContainer" + i);
  } else if (isVideo == 0) {
    $("<video>").remove();
    $("<img>")
      .attr({ id: "twitterImage", class: "card-image", src: data.media_link })
      .appendTo("#twitterContentContainer" + i);
  }
}
//UPDATES ON CLICK AMOUNT, FUTURE IMAGE REFERENCE
function updateCount() {
  cryptoHeld = convertDoge(clickCount);
  if (cryptoHeld == NaN) cryptoHeld = 0;
  $("#currentCrypto").text("Doge Coins:" + cryptoHeld);
}
//CLICKS CONVERTED TO HASHRATE PER CLICK
function convertDoge(clickCount) {
  cryptoHeld = clickCount * DOGE_HASHRATE;
  return cryptoHeld;
}
//CONVERTED AMOUNT
function conversionAmount(currentPrice, cryptoHeld) {
  var convertedTo = cryptoHeld.toFixed(5) * currentPrice;
  return convertedTo;
}
//CONVERTED AMOUNT + TOTALUSD
function conversionTotal(currentPrice, cryptoHeld) {
  usdConversion += conversionAmount(currentPrice, cryptoHeld) * CONVERSION_RATE;
  resetValues();
  return usdConversion;
}
//RESETS VALUES OF CLICK AND CRYPTOHELD AFTER CONVERSION
function resetValues() {
  clickCount = 0;
  cryptoHeld = 0;
  $("#currentCrypto").text(cryptoHeld);
}

//CALLS TEST HEADER, LOADS DATA FROM LOCALSTORAGE AND BUTTONS FOR TEST HEADER
//CHECKS IF LOCAL STORAGE POPULATED ELSE ZERO

if (localStorage.getItem("USD-held") == null && localStorage.getItem("crypto-held") == null && localStorage.getItem("hashRate") == null)  {
  var usdConversion = 0;
  var clickCount = 0;
  var DOGE_HASHRATE = 1.00
  storeCurrency(clickCount,usdConversion,DOGE_HASHRATE)
} else {
  loadCurrency(clickCount, usdConversion,DOGE_HASHRATE);
}
cryptoTrends(CRYPTO_TREND_API);

// setInterval(function(){
//     cryptoTrends(CRYPTO_TREND_API)
// },15000)
//INCREMENTS CRYPTOHELD
$("#increment").on("click", function (event) {
  event.preventDefault();
  clickCount++;
  updateCount(clickCount);
});
//CONVERTS CURRENT CRYPTOHELD TO USD
$("#convert").on("click", function (event) {
  event.preventDefault();
  cryptoToUSD(CRYPTO_USD_PRICE_API);
});
//SAVES usdConversion AND clickCount TO LOCAL STORAGE



$("#save").on("click", function (event) {
  event.preventDefault();
  storeCurrency(clickCount, usdConversion, DOGE_HASHRATE);
});