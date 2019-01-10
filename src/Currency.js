/* Class for currency conversions.  */

export default class Currency {
    static rateEtoD = 1;

    static EtoD(amount = 1) {
        if ("EUR" in localStorage) this.rateEtoD = JSON.parse(localStorage.getItem("EUR"))["value"];
        return (amount * this.rateEtoD).toFixed(4);
    }

    static DtoE(amount = 1) {
        if ("EUR" in localStorage) this.rateEtoD = JSON.parse(localStorage.getItem("EUR"))["value"];
        return (amount * (1 / this.rateEtoD)).toFixed(4);
    }
}