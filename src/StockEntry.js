/*  A class for a single stock entry and some methods to manipulate it. */

export default class StockEntry {
    constructor(symbol, value, amount = 0, updated = null){
        this.symbol = symbol;
        this.value = value;
        this.amount = amount;
        this.totalValue = this.value * this.amount;
        this.updated = updated;
    }

    getTotalValue() {
        return this.value * this.amount;
    }

    setValue(newValue) {
        this.value = newValue;
        this.totalValue = this.value * this.amount;
    }
}