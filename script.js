// OGNI 5 SECONDI
// recuperare valori tramite fetch
// console.log per verificare
// salvare nel file csv

const apiUrl = 'https://api.binance.com/api/v3/ticker/price?symbols=%5B%22BTCUSDT%22%2C%22ETHUSDT%22%5D'
const fs = require('fs'); // modulo per creare file fs = file system
const path = './prices.csv'; // nome del file

async function fetchPrices() {
    try {
        const result = await fetch(apiUrl)
        .then(response => response.json())
        return result.map(coin => ({symbol:coin.symbol, price:coin.price, timestamp:new Date().toISOString()}))
    } catch (error) {
        console.error(error);
    }
}

function saveToCSV(data) {
  data.forEach(({ symbol, price, timestamp }) => {
    const row = `${timestamp},${symbol},${price}\n`;
    fs.appendFileSync(path, row, 'utf8');
  });
}

// ogni 5 secondi esegue il fetch e salva il file
setInterval(
    async () => {
        const data = await fetchPrices()
        console.log(data);
        saveToCSV(data)
        
    }, 5000
)