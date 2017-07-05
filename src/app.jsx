const io = require('socket.io-client');
const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');
const socket = io();

let coinlist;

let buy;
let sell;

let Tcoin;

let Fcoin = 'BTC';
let Lcoin = 'VND';

let CoinList = React.createClass({
    getInitialState() {
        return {
            list: coinlist
        }
    },
    whenclick(e,sympol){
        console.log(sympol);
        coinlist.map(e=>{
            if (e.Sympol == sympol){
                Fcoin = e;
                buy.setState({
                    Acoin: Fcoin
                });
                sell.setState({
                    Acoin: Fcoin
                });
            }
        })
    },
    render() {
        let here = this;
        return (
            <ul className="buy-item" id="coin-list">
                {this.state.list.map((e, i) => {
                    if (e.Sympol != 'VND'){
                        return (<li key={i} className={(e.Sympol)}>
                            <button id={e.Sympol} onClick={(a)=>here.whenclick(a,e.Sympol)}>
                                <span className="coin-mark">
                                    <img src={"Images/" + e.Sympol + ".png"} alt="" className="img-responsive" />
                                    {e.Sympol}
                                </span>
                                <span className="coin-store">
                                    {e.Amount.toFixed(0)} {e.Sympol}
                                </span>
                            </button>
                        </li>
                        )
                }})}
            </ul>
        );
    },
    componentDidMount() {
    }
});



let BuyPanle = React.createClass({
    getInitialState() {
        buy = this;
        return {
            Acoin: {},
            Bcoin: {},
            total: 0,
            mang: coinlist
        }
    },
    change(){
        let here = this;
        let s;
        if ((this.refs.sl.value*100 %1) > 0){
            let a = this.refs.sl.value*100;
            a = parseInt(a);
            a= parseFloat(a);
            a= a/100;
            this.refs.sl.value = a;
        }
        if (this.refs.sl.value > this.state.Acoin.Amount){
            this.refs.sl.value = this.state.Acoin.Amount;
        }
        if (this.refs.sl.value < 0){
            this.refs.sl.value = 0;
        }
        s = this.state.Acoin.Buy_price * this.refs.sl.value;
        s = parseInt(s) ;
        this.setState({
            total: s
        });
    },
    render() {
        let here = this.state;
        return (
            <div className="panel">
                <div className="in-store">
                    <div className="text">Trong kho:</div>
                    <input type="submit" id="Buy_Store" value={here.Acoin.Amount + " " + here.Acoin.Sympol} />
                </div>
                <hr />
                <div className="price">
                    <div className="text">Giá mua:</div>
                    <input type="submit" id="Buy_Price" value={here.Acoin.Buy_price + " " + here.Bcoin.Sympol} />
                </div>
                <hr />
                <div className="amount">
                    <div className="text">Số lượng</div>
                    <input id="Buy_Amount" ref="sl" type="number" onChange={this.change} step={0.01}/>
                </div>
                <hr />
                <div className="total">
                    <div className="text">Thành tiền</div>
                    <input type="submit" id="Buy_Total" ref="total" value={here.total + " " + here.Bcoin.Sympol} />
                </div>
                <div className="buy-order-btn">
                    <a href="#">Mua</a>
                </div>
                <div className="guide">
                    <a href="#">Hướng dẫn mua!</a>
                </div>
            </div>
        );
    },
    componentDidMount(){
        let here = this;
        this.state.mang.map(e => {
            if (e.Sympol == Fcoin){
                here.setState({
                    Acoin: e
                });
            }
            if (e.Sympol == Lcoin){
                here.setState({
                    Bcoin: e
                });
            }
        });
    }
});

let SellPanel = React.createClass({
    getInitialState() {
        sell = this;
        return {
            Acoin: {},
            Bcoin: {},
            total: 0,
            mang: coinlist
        }
    },
    change(){
        let here = this;
        let s;
        if ((this.refs.sl.value*100 %1) > 0){
            let a = this.refs.sl.value*100;
            a = parseInt(a);
            a= parseFloat(a);
            a= a/100;
            this.refs.sl.value = a;
        }
        if (this.refs.sl.value < 0){
            this.refs.sl.value = 0;
        }
        s = this.state.Acoin.Sell_price * this.refs.sl.value;
        if (s > this.state.Bcoin.Amount){
            this.refs.sl.value = this.state.Bcoin.Amount / this.state.Acoin.Sell_price;
            let a = this.refs.sl.value*100;
            this.refs.sl.value = (a - (a%1 +1))/100;
        }
        s = this.state.Acoin.Sell_price * this.refs.sl.value;
        s = parseInt(s);
        this.setState({
            total: s
        });
    },
    render() {
        let here = this.state;
        return (
            <div className="panel">
                <div className="in-store">
                    <div className="text">Trong kho:</div>
                    <input type="submit" id="Sell_Store" value={here.Bcoin.Amount + " " + here.Bcoin.Sympol} />
                </div>
                <hr />
                <div className="price">
                    <div className="text">Giá mua:</div>
                    <input type="submit" id="Sell_Price" value={here.Acoin.Sell_price + " " + here.Bcoin.Sympol} />
                </div>
                <hr />
                <div className="amount">
                    <div className="text">Số lượng</div>
                    <input id="Sell_Amount" ref="sl" type="number" onChange={this.change} step={0.01}/>
                </div>
                <hr />
                <div className="total">
                    <div className="text">Thành tiền</div>
                    <input type="submit" id="Sell_Total" ref="total" value={here.total + " " + here.Bcoin.Sympol} />
                </div>
                <div className="buy-order-btn">
                    <a href="#">Mua</a>
                </div>
                <div className="guide">
                    <a href="#">Hướng dẫn mua!</a>
                </div>
            </div>
        );
    },
    componentDidMount(){
        let here = this;
        this.state.mang.map(e => {
            if (e.Sympol == Fcoin){
                here.setState({
                    Acoin: e
                });
            }
            if (e.Sympol == Lcoin){
                here.setState({
                    Bcoin: e
                });
            }
        });
    }
});



socket.on('SEND_COINS', coins => {

    coinlist = coins;
    ReactDOM.render(
        <BuyPanle />,
        document.getElementById('buy-order-place')
    );

    ReactDOM.render(
        <CoinList />,
        document.getElementById('danhsach')
    );

    ReactDOM.render(
        <SellPanel />,
        document.getElementById('sell-order-place')
    );
});

$('#register-btn').click(() => {
    const email = $('#email_register').val();
    if (email == "") {
        $('#note1').hide();
        $('#note2').hide();
        $('#note3').show();
    }
    else {
        socket.emit('SEND_REGISTER_REQUEST', email);
    }

});

socket.on('RETURN_REGISTER_REQUEST', kq => {
    if (kq == 0) {
        $('#note1').hide();
        $('#note2').show();
        $('#note3').hide();
    }
    if (kq == 1) {
        $('#note1').show();
        $('#note2').hide();
        $('#note3').hide();
    }
});

$('#login-btn').click(() => {
    const email = $('#email_login').val();
    if (email == "") {
        $('#note4').hide();
        $('#note5').hide();
        $('#note6').show();
    }
    else {
        socket.emit('SEND_LOGIN_REQUEST', email);
    }

});

socket.on('RETURN_LOGIN_REQUEST', kq => {
    if (kq == 0) {
        $('#note4').hide();
        $('#note5').show();
        $('#note6').hide();
    }
    if (kq == 1) {
        $('#note4').show();
        $('#note5').hide();
        $('#note6').hide();
    }
});

$('#edit-btn').click(() => {
    const email = $('#email').val();
    const nickname = $('#nickname').val();
    const TK = $('#tk').val();
    const Wallet = $('#wallet').val();
    if (!email || !nickname || !TK || !Wallet) {
        $('#note7').show();
        $('#note8').hide();
        $('#note9').hide();
    }
    else {
        socket.emit('SEND_EDIT_REQUEST', { email, nickname, TK, Wallet })
    }
});

socket.on('RETURN_EDIT_REQUEST', kq => {
    if (kq == 0) {
        $('#note7').hide();
        $('#note8').hide();
        $('#note9').show();
    }
    if (kq == 1) {
        $('#note7').hide();
        $('#note8').show();
        $('#note9').hide();
    }
});