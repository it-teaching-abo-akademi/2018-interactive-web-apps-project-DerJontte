/* Class for communicating with the stock data server AlphaVantage.com. The doQuery-method is the one excecuting all
* requests, while getCurrentForex, getCurrentStockValue and getStockHistory are convenience methods that format specific
* queries and sends them to doQuery.
*
* The doQuery-method returns quasi-http-statuses that tells the calling methods if the queries succeeded or not. */

export default class StockServerData {
    static checkTimeout(storageKey, interval) {
        // Method to check if a value in localStorage is older than a specified age in milliseconds
        let treshold = Date.now() - interval;
        if (storageKey in localStorage && JSON.parse(localStorage.getItem(storageKey))["updated"] > treshold) return false;
        return true;
    }

    static getCurrentForex(caller){
        // Method to query for the latest currency exchange rate between EUR and USD if the value has not been updated
        // in the last 60 seconds.
        if (this.checkTimeout("EUR", 60000)) {
            this.whoCalled = caller;
            let JSONKeys = ["Realtime Currency Exchange Rate", "5. Exchange Rate"];
            this.doQuery("CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD", "EUR", JSONKeys);
        }
    }

    static async getCurrentStockValue(caller, symbol) {
        // Method to query for the latest value of a given stock if the value has not been updated in the last 30 minutes.
        if (this.checkTimeout(symbol, 30 * 60000)) {
            this.whoCalled = caller;
            symbol = symbol.toUpperCase();
            let JSONKeys = ["Global Quote", "05. price"];
            let result = await this.doQuery("GLOBAL_QUOTE&symbol=" + symbol, symbol, JSONKeys);
            return result;
        }
        return 200;
    }

    static async getStockHistory(caller, symbol) {
        // Method to query for the performance history of a given stock. This data is always loaded from the server,
        // since storing the data locally would fill up the storage quota very quickly.
        this.whoCalled = caller;
        let storageKey = symbol + "History";
        symbol = symbol.toUpperCase();
        let JSONKeys = ["Time Series (Daily)"];
        return await this.doQuery("TIME_SERIES_DAILY&symbol=" + symbol + "&outputsize=full", storageKey, JSONKeys);
    }

    static doQuery(query, name, JSONKeys) {
        let whoCalled = this.whoCalled;
        let apikey = "myownapikey"; // The API key for the server. Free ones are available, but a "legit" one is actually not required... :-o
        let server ="https://www.alphavantage.co/query?function=";
        let request = server + query + "&apikey=" + apikey;

        return new Promise(resolve => {

            // Set the request timeout to 10 seconds
            setTimeout(() => {
                resolve(504);
            }, 10000);

            let xhttp = new XMLHttpRequest(); // Create a request object

            xhttp.onload = function() {
                /* Define the action to take when the server has responded. This must be done before the request is dispatched. */
                let returnValue = JSON.parse(this.responseText);

                /* If the server responds with a message about sending more than five requests in a minute, notify the user and
                 * set a key in localStorage with a timestamp. This timestamp is used to prevent more queries to be sent within
                 * the next minute and to prevent the already sent queries to cause several popups which would seriously
                 * harm the usability of the app. */
                if ("Note" in returnValue) {
                    if (!("requestLimit" in sessionStorage && sessionStorage.getItem("requestLimit") > Date.now() - 61000)) {
                        let message = "Could not fetch all requested stock data due to restrictions on free AlphaVantage API-keys, try again in a moment.\n\nThe server said:\n";
                        alert(message + JSON.parse(this.responseText)["Note"]);
                        sessionStorage.setItem("requestLimit", Date.now());
                    }
                    /* Set the response code to 200 ("OK"), even though the request was not met. This is actually just
                    *  a lazy way to prevent other methods from creating popups because of the same error.
                     */
                    resolve(200);
                    return;
                }

                /* If the server responded with some data, parse the data for the needed value(s) and store them in localStorage. */
                JSONKeys.forEach(key => returnValue = returnValue[key]);
                let storable = {value: returnValue, updated: Date.now()};
                localStorage.setItem(name, JSON.stringify(storable));
                whoCalled.saveState();
                resolve(200);
            };
            // Create the actual request and send it to the server.
            xhttp.open("GET", request, true);
            xhttp.send();
        });
    }
}
