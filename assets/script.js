//DOGE - DOGE COIN BTC - BITCOIN ETH - ETHEREUM
var strtbtn = $("#startGame")
var strtPage= $("#crypto")
var gamePage = $("#gamePage")
var shopPage = $("#shopContainer")
const API_KEY = "0a4a30fd69c551af6529573e0770da441e7496f29fade17e52b1b78e221a3444"
var cryptoCurrency = "DOGE,ETH,BTC";
const currencies = "USD"; 
var CRYPTO_USD_PRICE_API = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${cryptoCurrency}&tsyms=${currencies}&api_key=${API_KEY}`
var USD_CRYPTO_PRICE_API = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${currencies}&tsyms=${cryptoCurrency}&api_key=${API_KEY}`
//used in cryptoToUSD function
var value = 0
var increaseCrypto = 1
var usdConversion = 0
var cryptoHeld = 0
var USDHeld = 0
var clickCount=0

gamePage.hide()
shopPage.hide()
strtbtn.click(loadGamePage)

    function loadGamePage(){
        strtPage.hide()
        gamePage.show()
        // shopPage.show()
    console.log("bruh")}

    function cryptoToUSD(CRYPTO_USD_PRICE_API)
    {
        fetch(CRYPTO_USD_PRICE_API).then(function(response){
            return response.json()
        }).then(function(data){
            var currentPrice = data.DOGE.USD.toFixed(2)
            $("#cryptoPrice").text("The Current Price of Doge Coin is: $" + currentPrice + " per coin")
            $("#currentUSD").text("")
            $("#currentUSD").text(
               "You have converted "+ cryptoHeld
             + " Doge Coin to $" + conversionAmount(currentPrice,cryptoHeld).toFixed(2)
             + "\nYour Total is: $" + conversionTotal(currentPrice,cryptoHeld).toFixed(2) + " Dollars")
        })
    }

function storeCurrency(){
    localStorage.setItem("crypto-held",value)
    localStorage.setItem("USD-held",usdConversion)
    }

function testHeader() {
    $("<header>").attr({"id":"headerContainer"}).appendTo(document.body)
    $("<h1>").attr({"id":"cryptoPrice"}).appendTo("#headerContainer")
    $("<h1>").text("Dollars Available: $"+usdConversion.toFixed(2)).attr({"id":"currentUSD"}).appendTo("#headerContainer")
    $("<h2>").text("Doge Coins:"+cryptoHeld).attr({"id":"currentCrypto"}).appendTo("#headerContainer")
    $("<h1>").text("ClickHere").attr({"id":"increment"}).appendTo("#headerContainer")
    $("<h1>").text("Convert to USD").attr({"id":"convert"}).appendTo("#headerContainer")
    $("<h1>").text("Save").attr({"id":"save"}).appendTo("#headerContainer")
}

function updateCount(){
    cryptoHeld = convertDoge(clickCount)
    if(cryptoHeld == NaN)
    cryptoHeld = 0
    $("#currentCrypto").text("Doge Coins:"+cryptoHeld)
}
function convertDoge(clickCount){
    cryptoHeld = clickCount * DOGE_HASHRATE
    return cryptoHeld
}
function conversionAmount(currentPrice,cryptoHeld)
{
    var convertedTo=cryptoHeld.toFixed(5) * currentPrice
    return convertedTo 
}
function conversionTotal(currentPrice,cryptoHeld){
    usdConversion += conversionAmount(currentPrice,cryptoHeld)
    resetValues()
    return usdConversion
}
testHeader()

$("#increment").on("click",function(event){
    event.preventDefault()
    clickCount++
    updateCount(clickCount)
});
$("#convert").on("click",function(event){
    event.preventDefault()
    cryptoToUSD(CRYPTO_USD_PRICE_API)
});
$("#save").on("click",function(event){
    event.preventDefault()
    storeCurrency(clickCount,usdConversion)
});