export class Currency {
    static rateEtoD = 1.1;

    static round(amount) {
        return (amount * 10000).toFixed() / 10000;
    }

    static EtoD(amount = 1) {
        if ("EUR" in localStorage) this.rateEtoD = JSON.parse(localStorage.getItem("EUR"))["value"];
        return (amount * this.rateEtoD).toFixed(4);
    }

    static DtoE(amount = 1) {
        if ("EUR" in localStorage) this.rateEtoD = JSON.parse(localStorage.getItem("EUR"))["value"];
        return (amount * (1 / this.rateEtoD)).toFixed(4);
    }
}