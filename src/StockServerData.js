class Settings {
    static apikey = "anything2";
    static server ="https://www.alphavantage.co/query?function=";
}

export default class StockServerData {
    static getCurrentForex(){
        this.loadDoc("CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD")
    }

    static getCurrentStockValue(symbol) {
        this.loadDoc("GLOBAL_QUOTE&symbol=" + symbol.toUpperCase(), symbol);
    }

    static parseGlobalQuote(JSONData) {
        return JSON.parse(JSONData)["Global Quote"]["05. price"];
    }

    static loadDoc(query, symbol) {
        let request = Settings.server + query + "&apikey=" + Settings.apikey;
        var xhttp = new XMLHttpRequest();

        xhttp.onload = function() {
            if (!this.responseText.includes("price")) {
                alert("Symbol " + symbol.toUpperCase() + " caused an error.\n\n" + this.responseText);
                return null;
            }
            let currentValue = StockServerData.parseGlobalQuote(this.responseText);
            let now = Date.now();
            let storable = {value: currentValue, updated: now};
            localStorage.setItem(symbol, JSON.stringify(storable));
            return this.responseText;
        };
        xhttp.open("GET", request, true);
        xhttp.send();
    }
}
