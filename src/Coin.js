const queryDB = require('../control/pg-control.js');

class Coin{
    constructor(Sympol, Amount, Buy_price, Sell_price){
        this.Sympol = Sympol;
        this.Amount = Amount;
        this.Buy_price = Buy_price;
        this.Sell_price = Sell_price;
    }

    static getCoins(){
        const sql = `SELECT "Sympol", "Amount", "Buy_price", "Sell_price" FROM public."Coin";`;
        return queryDB(sql,[])
        .then( result => {
            return result;
        })
    }
    getCoin(){
        const sql = `SELECT "Sympol", "Amount", "Buy_price", "Sell_price" FROM public."Coin" WHERE "Sympol" = $1;`;
        return queryDB(sql,[this.Sympol])
        .then( result => {
            return result;
        })
    }
}

module.exports = Coin;