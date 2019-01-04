import {Currency} from "./Currency";

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
        this.state = {};
    }

    addStock(entry) {
        this.entries.push(entry);
        this.value += entry.totalValue;
    }

    getValue() {
        return (this.currency == "USD") ? this.value : Currency.DtoE(this.value);
    }

    changeCurrency() {
        this.currency = (this.currency == "EUR") ? "USD" : "EUR";
    }

    getCurrentRate() {
        return (this.currency == "EUR") ? 1 : Currency.rateEtoD;
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
}

export class StockEntry {
    constructor(symbol, value, amount = 0, updated = null){
        this. symbol = symbol;
        this.value = value;
        this.getValue = this.getValue();
        this.amount = amount;
        this.totalValue = Currency.round(this.value * this.amount);
        this.updated = updated;
    }

    getValue() {
        return this.value;
    }
}