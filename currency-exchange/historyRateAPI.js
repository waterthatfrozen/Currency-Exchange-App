const URL = 'https://api.exchangerate.host/timeseries?base=THB';
const currencyList = require('./currencyList.json');

export default async () => {
    let symbols = "&symbols=";
    currencyList.currency.forEach((item) => symbols += item.symbol + ",");
    symbols = symbols.slice(0, -1);
    let currentDate = new Date();
    let endDate = currentDate.toISOString().slice(0, 10);
    currentDate.setDate(currentDate.getDate() - 7);
    let startDate = currentDate.toISOString().slice(0, 10);
    let fetchURL = URL + symbols + "&start_date=" + startDate + "&end_date=" + endDate;
    return await fetch(fetchURL).then(function(response){
        return response.json();
    });
}