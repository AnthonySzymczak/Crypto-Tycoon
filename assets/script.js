//DOGE - DOGE COIN BTC - BITCOIN ETH - ETHEREUM
const API_KEY = "0a4a30fd69c551af6529573e0770da441e7496f29fade17e52b1b78e221a3444"
var cryptoCurrency = "DOGE,ETH,BTC";
const currencies = "USD"; 
var CRYPTO_USD_PRICE_API = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${cryptoCurrency}&tsyms=${currencies}&api_key=${API_KEY}`
var USD_CRYPTO_PRICE_API = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${currencies}&tsyms=${cryptoCurrency}&api_key=${API_KEY}`
//used in cryptoToUSD function
var value = 0
var increment = .25
var usdConversion = 0

function cryptoToUSD(CRYPTO_USD_PRICE_API)
{
    fetch(CRYPTO_USD_PRICE_API).then(function(response){
        return response.json()
    }).then(function(data){
        value += increment; 
        console.log(value,usdConversion)
        usdConversion = value.toFixed(5) * data.BTC.USD.toFixed(5)
        console.log(value,usdConversion)
    })
}
function USDToCrypto(USD_CRYPTO_PRICE_API)
{
    fetch(USD_CRYPTO_PRICE_API).then(function(response){
        console.log(response.json())
    }).then(function(data){
        console.log(data)
        
    });
}
setInterval(function(){
    cryptoToUSD(CRYPTO_USD_PRICE_API)
},2000)

USDToCrypto(USD_CRYPTO_PRICE_API)