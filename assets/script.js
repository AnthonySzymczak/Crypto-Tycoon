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
function incrementOnClick(){
    cryptoHeld += increaseCrypto
    return cryptoHeld
}
function convertToUSD(currentPrice,cryptoHeld){
    usdConversion = cryptoHeld.toFixed(5) * currentPrice
    return usdConversion
}

function cryptoToUSD(CRYPTO_USD_PRICE_API,cryptoHeld)
var increment = .25
var usdConversion = 0

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
        currentPrice = data.DOGE.USD.toFixed(2)
        $("#cryptoPrice").text(currentPrice)
        $("#currentUSD").text(convertToUSD(currentPrice,clickCount))
      //  return convertToUSD(currentPrice,cryptoHeld)
    })
}
function USDToCrypto(USD_CRYPTO_PRICE_API)
{
    fetch(USD_CRYPTO_PRICE_API).then(function(response){
        console.log(response.json())
    }).then(function(data){
        // console.log(data)
        
    });
}
// setInterval(function(){
//     cryptoToUSD(CRYPTO_USD_PRICE_API)
// },5000)



USDToCrypto(USD_CRYPTO_PRICE_API)



$("#clickHere").on("click",function(){
    $("#currentCrypto").text(clickCount)   
      cryptoToUSD(CRYPTO_USD_PRICE_API) 

});

// $("#Calculate").on("click",function(){
// cryptoToUSD(CRYPTO_USD_PRICE_API) 
// });
//     storeCurrency
// },2000)
    USDToCrypto(USD_CRYPTO_PRICE_API)
    
    function storeCurrency(){
    localStorage.setItem("crypto-held",value)
    localStorage.setItem("USD-held",usdConversion)
    }
console.log(localStorage)

function testHeader() {
    $("<header>").attr({"id":"headerContainer"}).appendTo(document.body)
    $("<h1>").attr({"id":"cryptoPrice"}).appendTo("#headerContainer")
    $("<h1>").text("Dollars Available: $"+usdConversion.toFixed(2)).attr({"id":"currentUSD"}).appendTo("#headerContainer")
    $("<h2>").text("Doge Coins:"+cryptoHeld).attr({"id":"currentCrypto"}).appendTo("#headerContainer")
    $("<h1>").text("ClickHere").attr({"id":"increment"}).appendTo("#headerContainer")
    $("<h1>").text("Convert to USD").attr({"id":"convert"}).appendTo("#headerContainer")
    $("<h1>").text("Save").attr({"id":"save"}).appendTo("#headerContainer")
}

testHeader()