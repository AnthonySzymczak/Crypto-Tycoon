//DOGE - DOGE COIN BTC - BITCOIN ETH - ETHEREUM
const API_KEY = "0a4a30fd69c551af6529573e0770da441e7496f29fade17e52b1b78e221a3444"
var cryptoCurrency = "DOGE,ETH,BTC";
const currencies = "USD"; 
var CRYPTO_USD_PRICE_API = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${cryptoCurrency}&tsyms=${currencies}&api_key=${API_KEY}`
var USD_CRYPTO_PRICE_API = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${currencies}&tsyms=${cryptoCurrency}&api_key=${API_KEY}`

function cryptoToUSD(CRYPTO_USD_PRICE_API)
{
    fetch(CRYPTO_USD_PRICE_API).then(function(response){
        console.log(response.json())
    }).then(function(data){
        console.log(data)
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

cryptoToUSD(CRYPTO_USD_PRICE_API)
USDToCrypto(USD_CRYPTO_PRICE_API)