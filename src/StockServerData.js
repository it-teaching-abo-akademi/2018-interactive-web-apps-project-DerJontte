class ServerSettings {
    static apikey = "anything2";
    static server ="https://www.alphavantage.co/query?function=";
}

export default class StockServerData {
    static checkTimeout(storageKey, interval) {
        let treshold = Date.now() - interval;
        if (storageKey in localStorage && JSON.parse(localStorage.getItem(storageKey))["updated"] > treshold) return false;
        return true;
    }

    static getCurrentForex(caller){
        let timeout = 1000 * 60;
        this.whoCalled = caller;
        let JSONKeys = ["Realtime Currency Exchange Rate", "5. Exchange Rate"]
        if (this.checkTimeout("EUR", timeout)) {
            this.doQuery("CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD", "EUR", JSONKeys);
        }
    }

    static async getCurrentStockValue(caller, symbol) {
        let timeout = 1000 * 60;
        this.whoCalled = caller;
        symbol = symbol.toUpperCase();
        let JSONKeys = ["Global Quote", "05. price"]
        if (this.checkTimeout(symbol, timeout)) {
            let result = await this.doQuery("GLOBAL_QUOTE&symbol=" + symbol, symbol, JSONKeys);
            return result;
        }
        return 200;
    }

    static async getStockHistory(caller, symbol) {
        let timeout = 1000 * 60 * 60 * 24;
        let storageKey = symbol + "History";
        this.whoCalled = caller;
        symbol = symbol.toUpperCase();
        let JSONKeys = ["Time Series (Daily)"];
        if (this.checkTimeout(storageKey, timeout)) {
            return await this.doQuery("TIME_SERIES_DAILY&symbol=" + symbol + "&outputsize=full", storageKey, JSONKeys);
        }
        return 200;
    }

    static doQuery(query, name, JSONKeys) {
        return new Promise(resolve => {
            var timeout = setTimeout(() => {
                resolve(504);
            }, 10000);
            let server = StockServerData;
            let whoCalled = this.whoCalled;

            let request = ServerSettings.server + query + "&apikey=" + ServerSettings.apikey;
            var xhttp = new XMLHttpRequest();

            xhttp.onload = function() {
                let returnValue = JSON.parse(this.responseText);
                if ("Note" in returnValue) {
                    let message = "Could not fetch all stock data. Try again in a moment. The server said:\n\n";
                    alert(message + JSON.parse(this.responseText)["Note"]);
                    clearTimeout(timeout);
                    resolve(-1);
                    return;
                }
                JSONKeys.forEach(key => returnValue = returnValue[key]);
                if (returnValue == undefined) {
                    resolve(-1);
                    return -1;
                }
                let storable = {value: returnValue, updated: Date.now()};
                localStorage.setItem(name, JSON.stringify(storable));
                whoCalled.saveState();
                resolve(200);
            };
            xhttp.open("GET", request, true);
            xhttp.send();
        });
    }
}
