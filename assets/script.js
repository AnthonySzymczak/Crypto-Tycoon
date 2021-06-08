//DOGE - DOGE COIN BTC - BITCOIN ETH - ETHEREUM
//CONSTANTS
const API_KEY = "0a4a30fd69c551af6529573e0770da441e7496f29fade17e52b1b78e221a3444"
const CURRENCIES = "USD"; 
const DOGE_HASHRATE = .25
const SAVED_VARIABLES = 2
const CRYPTOCURRENCIES_CONVERSION = "DOGE,ETH,BTC";
const CRYPTOCURRENCIES_TREND = "doge-dogecoin,eth-ethereum,btc-bitcoin"
const DECIMAL_POINTS = 2
//JQUERY ID REFERENCES
var strtbtn = $("#startGame")
var strtPage= $("#crypto")
var gamePage = $("#gamePage")
var shopPage = $("#shopContainer")

//API KEYS
var CRYPTO_USD_PRICE_API = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${CRYPTOCURRENCIES_CONVERSION.split(",")[0]}&tsyms=${CURRENCIES}&api_key=${API_KEY}`
var CRYPTO_TREND_API = `https://api.coinpaprika.com/v1/tickers/${CRYPTOCURRENCIES_TREND.split(",")[0]}/`
//VARIABLES FOR CONVERSION

var usdConversion = 0
var cryptoHeld = 0
var clickCount=0

gamePage.hide()
shopPage.hide()
strtbtn.click(loadGamePage)

function loadGamePage() {
    strtPage.hide()
    gamePage.show()
    // shopPage.show()
}



function cryptoTrends(CRYPTO_TREND_API){
    fetch(CRYPTO_TREND_API).then(function(response){
        return response.json()
    }).then(function (data) {
        console.log(data)
        const {percent_change_15m,percent_change_1h,percent_change_24h} = data.quotes.USD
        dogeTicker({percent_change_15m,percent_change_1h,percent_change_24h})
    })
}
function dogeTicker(data) {
    $("#innerMarquee15m").text(data.percent_change_15m + "%")
    $("#innerMarquee1h").text(data.percent_change_1h + "%")
    $("#innerMarquee1d").text(data.percent_change_24h + "%")
        if(data.percent_change_15m > 0)
        {
            $("#innerMarquee15m").removeClass("negativeChange neutralChange").addClass("positiveChange")
        } else if(data.percent_change_15m < 0) {
            $("#innerMarquee15m").removeClass("positiveChange neutralChange").addClass("negativeChange")
        } else {
            $("#innerMarquee15m").removeClass("positiveChange negativeChange").addClass("neutralChange")
        }
        if(data.percent_change_1h > 0)
        {
            $("#innerMarquee1h").removeClass("negativeChange neutralChange").addClass("positiveChange")
        } else if(data.percent_change_1h < 0) {
            $("#innerMarquee1h").removeClass("positiveChange neutralChange").addClass("negativeChange")
        } else {
            $("#innerMarquee1h").removeClass("positiveChange negativeChange").addClass("neutralChange")
        }
        if(data.percent_change_24h > 0)
        {
            $("#innerMarquee1d").removeClass("negativeChange neutralChange").addClass("positiveChange")
        } else if(data.percent_change_24h < 0) {
            $("#innerMarquee1d").removeClass("positiveChange neutralChange").addClass("negativeChange")
        } else {
            $("#innerMarquee1d").removeClass("positiveChange negativeChange").addClass("neutralChange")
        }
        
}
//FETCH API THAT CONVERTS ON CLICK AND RETURNS SUM OF cryptoHeld + usdConversion
//ALSO SHOWS AMOUNT CONVERTED ON CLICK AND CURRENT DOGE PRICE
function cryptoToUSD(CRYPTO_USD_PRICE_API) {
    fetch(CRYPTO_USD_PRICE_API).then(function (response) {
        return response.json()

    }).then(function (data) {
        var currentPrice = data.DOGE.USD.toFixed(DECIMAL_POINTS)
        $("#cryptoPrice").text("The Current Price of Doge Coin is: $" + currentPrice + " per coin")
        $("#currentUSD").text("")
        $("#currentUSD").text(
            "You have converted " + cryptoHeld
            + " Doge Coin to $" + conversionAmount(currentPrice, cryptoHeld).toFixed(DECIMAL_POINTS)
            + "\nYour Total is: $" + conversionTotal(currentPrice, cryptoHeld).toFixed(DECIMAL_POINTS) + " Dollars")
    })
}
//LOAD STORE SECTION, LOADS AND STORES clickCount AND usdConversion
function storeCurrency() {
    localStorage.setItem("crypto-held", clickCount)
    localStorage.setItem("USD-held", usdConversion)
}
function loadCurrency() {
    clickCount = loadClicks()
    usdConversion = loadUSDConversion()
    displayCurrentValues(clickCount, usdConversion)
}
function loadClicks() {
    var clickCount = localStorage.getItem("crypto-held")
    return clickCount
}
function loadUSDConversion() {
    var usdConversion = localStorage.getItem("USD-held")
    usdConversion = parseFloat(usdConversion)
    return usdConversion
}
//CONVERTS AND DISPLAYS UPDATED clickCount and usdConversion FROM LOCAL STORAGE
function displayCurrentValues(clickCount, usdConversion) {
    console.log(clickCount,usdConversion)
    usdConversion = parseFloat(usdConversion)
    $("#currentUSD").text("Dollars Available: $"+ usdConversion.toFixed(DECIMAL_POINTS))
    cryptoHeld = convertDoge(clickCount)
    $("#currentCrypto").text("Doge Coins:"+cryptoHeld)
    }
//TEST HEADER TO DISPLAY on.("click") FUNCTIONALITY, CAN BE DELETED ONCE GAME
//PAGE HAS BEEN CREATED AND ID's CORRECTLY REFERENCED. 
function testHeader() {
    $("<header>").attr({"id":"headerContainer"}).appendTo(document.body)
    $("<h1>").attr({"id":"cryptoPrice"}).appendTo("#headerContainer")
    $("<h1>").text("Dollars Available: $"+usdConversion.toFixed(DECIMAL_POINTS)).attr({"id":"currentUSD"}).appendTo("#headerContainer")
    $("<h2>").text("Doge Coins:"+cryptoHeld).attr({"id":"currentCrypto"}).appendTo("#headerContainer")
    $("<h1>").text("ClickHere").attr({"id":"increment"}).appendTo("#headerContainer")
    $("<h1>").text("Convert to USD").attr({"id":"convert"}).appendTo("#headerContainer")
    $("<h1>").text("Save").attr({"id":"save"}).appendTo("#headerContainer")
}
function twitterFeed(){
    $("<div>").attr({"id":"twitterContainer", "class":"card"}).appendTo("#marquee2")
    $("<header>").attr({"id":"twitterHeader","class":"card-header"}).appendTo("#twitterContainer")
    $("<img>").attr({"id":"twitterHeaderIcon","class":"card-header-icon", "src":"http://pbs.twimg.com/profile_images/1389265488836890624/8u5wEQ9Z_normal.png"}).appendTo("#twitterHeader")
    $("<p>").text("twitterName").attr({"id":"twitterHeaderTitle","class":"card-header-title"}).appendTo("#twitterHeader")
    $("<div>").attr({"id":"twitterContentContainer", "class":"card-content"}).appendTo("#twitterContainer")
    $("<p>").text("just gonna leave this right here ... ").attr({"id":"twitterContent","class":"content"}).appendTo("#twitterContentContainer")
    twitterMedia()
    $("<footer>").attr({"id":"twitterFooterContainer","class":"card-footer"}).appendTo("#twitterContainer")
    $("<p>").text("Retweets:" + " 13000").attr({"id":"twitterRT", "class":"card-footer-item"}).appendTo("#twitterFooterContainer")
    $("<p>").text("Likes:" + " 0").attr({"id":"twitterFooterLikes","class":"card-footer-item"}).appendTo("#twitterFooterContainer")
  
    
}
function twitterMedia(){
    $("<video>").attr({"id":"twitterVideo", "class":"card-image", "src":"https://video.twimg.com/tweet_video/E2-xIxeVUAMRCDx.mp4"}).appendTo("#twitterContentContainer")
    $("<img>").attr({"id":"twitterImage", "class":"card-image", "src":""}).appendTo("#twitterContainer")
}
//UPDATES ON CLICK AMOUNT, FUTURE IMAGE REFERENCE
function updateCount(){
    cryptoHeld = convertDoge(clickCount)
    if(cryptoHeld == NaN)
    cryptoHeld = 0
    $("#currentCrypto").text("Doge Coins:"+cryptoHeld)
}
//CLICKS CONVERTED TO HASHRATE PER CLICK
function convertDoge(clickCount){
    cryptoHeld = clickCount * DOGE_HASHRATE
    return cryptoHeld
}
//CONVERTED AMOUNT
function conversionAmount(currentPrice,cryptoHeld)
{
    var convertedTo=cryptoHeld.toFixed(5) * currentPrice
    return convertedTo 
}
//CONVERTED AMOUNT + TOTALUSD
function conversionTotal(currentPrice,cryptoHeld){
    usdConversion += conversionAmount(currentPrice,cryptoHeld)
    resetValues()
    return usdConversion
}
//RESETS VALUES OF CLICK AND CRYPTOHELD AFTER CONVERSION
function resetValues() {
    clickCount = 0
    cryptoHeld = 0
    $("#currentCrypto").text(cryptoHeld)
}

//CALLS TEST HEADER, LOADS DATA FROM LOCALSTORAGE AND BUTTONS FOR TEST HEADER
//CHECKS IF LOCAL STORAGE POPULATED ELSE ZERO
if(localStorage.length< SAVED_VARIABLES)
{
    var usdConversion = 0
    var clickCount=0

} else {
    console.log(clickCount,usdConversion)
    loadCurrency(clickCount,usdConversion)
 
}
testHeader()
twitterFeed()
cryptoTrends(CRYPTO_TREND_API)
// setInterval(function(){
//     cryptoTrends(CRYPTO_TREND_API)
// },15000)
//INCREMENTS CRYPTOHELD
$("#increment").on("click",function(event){
    event.preventDefault()
    clickCount++
    updateCount(clickCount)
});
//CONVERTS CURRENT CRYPTOHELD TO USD
$("#convert").on("click",function(event){
    event.preventDefault()
    cryptoToUSD(CRYPTO_USD_PRICE_API)
});
//SAVES usdConversion AND clickCount TO LOCAL STORAGE
$("#save").on("click",function(event){
    event.preventDefault()
    storeCurrency(clickCount,usdConversion)
});