export class Portfolio {
    constructor(id, name) {
        this.id = id;
        this.name = (name != (undefined || "") ? name : "Portfolio #" + id);
        this.entries = [];
        this.selected = '';
        this.value = 0;
        this.addStock = this.addStock.bind(this);
        this.removeStock = this.removeStock.bind(this);
    }

    addStock(entry) {
        if (this.entries.length >= 50){
            alert("The maximum number of stocks in the current portfolio has been reached.\nPlease delete an existing stock or select another portfolio to continue.");
            return;
        }
        this.entries.push(entry);
        this.value += (entry.value * entry.amount);

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
        this.amount = amount;
        this.totalValue = this.value * this.amount;
        this.updated = updated;
    }
}