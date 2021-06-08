//DOGE - DOGE COIN BTC - BITCOIN ETH - ETHEREUM
//CONSTANTS
const API_KEY = "0a4a30fd69c551af6529573e0770da441e7496f29fade17e52b1b78e221a3444"
const CURRENCIES = "USD"; 
const DOGE_HASHRATE = .25
const SAVED_VARIABLES = 2
const CRYPTOCURRENCIES_CONVERSION = "DOGE,ETH,BTC";
const CRYPTOCURRENCIES_TREND = "doge-dogecoin,eth-ethereum,btc-bitcoin"
const DECIMAL_POINTS = 2
const TWEETS = 3;
//JQUERY ID REFERENCES
var strtbtn = $("#startGame")
var strtPage= $("#crypto")
var gamePage = $("#gamePage")
var shopPage = $("#shopContainer")

//API KEYS, APIs USED, Cryptocompare, Coinpaprika
var CRYPTO_USD_PRICE_API = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${CRYPTOCURRENCIES_CONVERSION.split(",")[0]}&tsyms=${CURRENCIES}&api_key=${API_KEY}`
var CRYPTO_TREND_API = `https://api.coinpaprika.com/v1/tickers/${CRYPTOCURRENCIES_TREND.split(",")[0]}/`
var CRYPTO_TWITTER_API = `https://api.coinpaprika.com/v1/coins/${CRYPTOCURRENCIES_TREND.split(",")[0]}/twitter`
//VARIABLES FOR CONVERSION


var usdConversion = 0;
var cryptoHeld = 0;
var clickCount = 0;


gamePage.hide()
shopPage.hide()
strtbtn.click(loadGamePage)

function loadGamePage() {
    strtPage.hide()
    gamePage.show()
    // shopPage.show()
}

function cryptoTwitter(CRYPTO_TWITTER_API){
    fetch(CRYPTO_TWITTER_API).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
        for(var i = 0;i<TWEETS;i++){
        const {date,like_count,media_link,retweet_count,status,user_image_link,user_name} = data[i]

        var splitMedia = media_link.split("/")
        if(splitMedia.indexOf("media") == -1){
            var isVideo = 1
        } else 
        {
            isVideo = 0
        }
        console.log( date,like_count,media_link,retweet_count,status,user_image_link,user_name)
        var conversionDate = new Date(date)
        console.log(date)
        console.log(conversionDate)
        conversionDate = conversionDate.toLocaleDateString("en-US")
        console.log(conversionDate)
        twitterFeed(i,{conversionDate,like_count,media_link,retweet_count,status,user_image_link,user_name},isVideo)

        }
    })
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

function twitterFeed(i,data,isVideo){
    console.log(data)
    console.log(isVideo)
    console.log(data.media_link)

    $("<div>").attr({"id":"twitterContainer"+i, "class":"card"}).appendTo("#marquee2")
    $("<header>").attr({"id":"twitterHeader"+i,"class":"card-header"}).appendTo("#twitterContainer"+i)
    $("<img>").attr({"id":"twitterHeaderIcon"+i,"class":"card-header-icon", "src": data.user_image_link}).appendTo("#twitterHeader"+i)
    $("<p>").text(data.user_name).attr({"id":"twitterHeaderTitle"+i,"class":"card-header-title"}).appendTo("#twitterHeader"+i)
    $("<div>").attr({"id":"twitterContentContainer"+i, "class":"card-content"}).appendTo("#twitterContainer"+i)
    $("<p>").text(data.status).attr({"id":"twitterContent"+i,"class":"content"}).appendTo("#twitterContentContainer"+i)

    twitterMedia(i,data, isVideo)
    $("<footer>").attr({"id":"twitterFooterContainer"+i,"class":"card-footer"}).appendTo("#twitterContainer"+i)
    $("<p>").text("Retweets:" + data.retweet_count).attr({"id":"twitterRT"+i, "class":"card-footer-item"}).appendTo("#twitterFooterContainer"+i)
    $("<p>").text("Likes:" + data.like_count).attr({"id":"twitterFooterLikes"+i,"class":"card-footer-item"}).appendTo("#twitterFooterContainer"+i)
    $("<p>").text(data.conversionDate).attr({"id":"twitterFooterDate"+i,"class":"card-footer"}).appendTo("#twitterContainer"+i)   
}
function twitterMedia(i,data,isVideo){
    console.log(isVideo,data.media_link)
    if(isVideo == 1){
    $("<img>").remove()    
    $("<video>").attr({"id":"twitterVideo", "class":"card-image", "src":data.media_link}).appendTo("#twitterContentContainer"+i)
    } else if(isVideo == 0){
    $("<video>").remove()    
    $("<img>").attr({"id":"twitterImage", "class":"card-image", "src":data.media_link}).appendTo("#twitterContentContainer"+i)
    }

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
cryptoTwitter(CRYPTO_TWITTER_API)
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


