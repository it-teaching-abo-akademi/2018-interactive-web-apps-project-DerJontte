export class Portfolio {
    constructor(id, name = "Unnamed Portfolio") {
        this.id = id;
        this.name = name;
        this.entries = [];
        this.selected = '';
        this.value = 0;
        this.addStock = this.addStock.bind(this);
        this.removeStock = this.removeStock.bind(this);
    }

    addStock(entry) {
        this.entries.push(entry);
        this.value += (entry.value * entry.amount);

    }

    removeStock(index, amount) {
        alert(index + " " + amount);
        if(index === undefined || amount === null) return;
        let entry = this.entries[index];

        if (entry === null) return;

        if (entry.amount == amount) {
            this.value -= entry.totalValue;
            this.entries[index] = null;
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
        this.amount = amount;
        this.totalValue = this.value * this.amount;
        this.updated = updated;
    }
}