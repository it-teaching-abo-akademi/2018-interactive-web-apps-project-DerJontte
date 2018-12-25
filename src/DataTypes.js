export class Portfolio {
    constructor(id, name = "Unnamed Portfolio") {
        this.id = id;
        this.name = name;
        this.entries = new Array(50);
        this.value = 0;
    }

    addStock(entry) {
        this.entries.push(entry);
        this.value += (entry.value * entry.amount);
    }
}

export class StockEntry {
    constructor(symbol, value, amount = 0, updated = null){
        this. symbol = symbol;
        this.value = value;
        this.amount = amount;
        this.totalValue = this.value * this.amount;
        this.updated = updated;
    }
}