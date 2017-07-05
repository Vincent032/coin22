const queryDB = require('../control/pg-control.js');

class User{
    constructor(email, nickname, TK, Wallet, Presenter){
        this.email = email;
        this.nickname = nickname;
        this.TK = TK;  
        this.Wallet = Wallet;
        this.Presenter = Presenter;
    }

    register(){
        const sql = `INSERT INTO public."User"(email) VALUES ( $1 );`;
        return queryDB(sql, [this.email]);
    }

    login(){
        const sql = `SELECT * FROM public."User" WHERE email = $1;`
        return queryDB(sql, [this.email])
        .then( result => {
            if (!result.rows[0]) return 0;
            this.nickname = result.rows[0].nickname;
            this.TK = result.rows[0].TK;
            this.Wallet = result.rows[0].Wallet;
            this.Presenter = result.rows[0].Presenter;
            return 1;
        })
        .catch( err => {
            console.log(err.toString());
            return err;
        });
    }

    update(){
        const sql = `UPDATE public."User"
	    SET  nickname=$2, "TK"=$3, "Wallet"=$4
	    WHERE email = $1;`;
        return queryDB(sql, [this.email, this.nickname, this.TK, this.Wallet]);
    }
}
module.exports = User;