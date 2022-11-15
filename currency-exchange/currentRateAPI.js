const URL = 'https://api.exchangerate.host/latest?base=THB';
const currencyList = require('./currencyList.json');

export default async () => {
    let symbols = "&symbols=";
    currencyList.currency.forEach((item) => symbols += item.symbol + ",");
    symbols = symbols.slice(0, -1);
    return await fetch(URL + symbols).then(function(response){
        return response.json();
    });
}