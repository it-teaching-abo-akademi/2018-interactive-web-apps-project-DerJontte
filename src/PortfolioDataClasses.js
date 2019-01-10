import Currency from "./Currency";

export class Portfolio {
    constructor(id, name) {
        this.id = id;
        this.name = (name != (undefined || "") ? name : "Portfolio #" + id);
        this.entries = [];
        this.selected = '';
        this.value = 0;
        this.currency = "EUR";
        this.addStock = this.addStock.bind(this);
        this.removeStock = this.removeStock.bind(this);
    }

    addStock(...args) {
        var entry = args[0];
        switch (args.length) {
            case 1:
                var index = this.entries.length;
                var toRemove = 0;
                break;
            case 2:
                index = args[1];
                toRemove = 1;
                entry.amount = parseInt(entry.amount) + parseInt(this.entries[index].amount);
                entry.totalValue = entry.getTotalValue();
                break;
            default:
                return;
        }
        this.entries.splice(index, toRemove, args[0]);
        this.calculateValue();
    }

    getValue() {
        return (this.currency == "USD") ? this.value : Currency.DtoE(this.value);
    }

    changeCurrency() {
        this.currency = (this.currency == "EUR") ? "USD" : "EUR";
    }

    getCurrentRate(value = 1) {
        let toReturn = parseFloat((this.currency == "USD") ? value : Currency.DtoE(value));
        return toReturn.toFixed(2);
    }

    getCurrentValue(stock) {
        if (stock.symbol in localStorage) {
            stock.setValue(JSON.parse(localStorage.getItem(stock.symbol))["value"]);
            this.calculateValue();
        }
        var toReturn = parseFloat((this.currency == "USD") ? stock.value : Currency.DtoE(stock.value));
        return toReturn.toFixed(2);
    }

    removeStock(index, amount) {
        if(index == undefined || amount === null) return;
        let entry = this.entries[index];
        if (entry == (undefined || null)) return;
        if (amount > entry.amount) {
            // eslint-disable-next-line
            let removeAll = confirm("You are trying to remove more shares than there are in the selected stock. Do you want to remove all " + entry.amount + " shares and delete the entry?");
            if (removeAll) {
                amount = entry.amount;
            } else {
                return;
            }
        }

        // eslint-disable-next-line
        if (entry.amount == amount) {
            this.value -= entry.totalValue;
            this.entries.splice(index, 1);
            this.selected = '';
            return;
        }
        entry.amount -= amount;
        entry.totalValue = entry.value * entry.amount;
        this.value -= entry.value * amount;
    }

    calculateValue() {
        var newValue = 0;
        for (let i = 0; i < this.entries.length; i++) {
            newValue += parseFloat(this.entries[i].getTotalValue());
        }
        this.value = newValue;
    }
}

export class StockEntry {
    constructor(symbol, value, amount = 0, updated = null){
        this.symbol = symbol;
        this.value = value;
        this.amount = amount;
        this.totalValue = this.value * this.amount;
        this.updated = updated;
    }

    get() {
        return this.symbol;
    }

    getValue() {
        return this.value;
    }

    getTotalValue() {
        return this.value * this.amount;
    }

    setValue(newValue) {
        this.value = newValue;
        this.totalValue = this.value * this.amount;
    }
}