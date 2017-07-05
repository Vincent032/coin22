const express = require('express');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const nmh = require('nodemailer-express-handlebars')

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { pingTimeout: 1000 });

const User = require('./src/User.js');
const queryDB = require('./control/pg-control.js');
const jwt = require('./control/jwt.js');
const makecode = require('./control/makecode.js')
const Coin = require('./src/Coin.js');

const arrVerify = [];
const arrLogin = [];

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(cookieParser());

app.get('/test', (req, res) => {
    res.render('admin');
});

app.get('/', (req, res) => {
    const { BUSE_TOKEN } = req.cookies;
    jwt.getObject(BUSE_TOKEN)
        .then(obj => {
            if (obj.nickname && obj.TK && obj.Wallet) {
                Coin.getCoins()
                    .then(result => {
                        res.render('home', { obj, arrCoin: result.rows });
                    });

            }
            else {
                res.redirect('/account');
            }
        })
        .catch(err => {
            Coin.getCoins()
                .then(result => {
                    let email = undefined;
                    let obj = { email };
                    res.render('home', { obj, arrCoin: result.rows });
                });
        });
});

app.get('/history', (req, res) => {
    const { BUSE_TOKEN } = req.cookies;
    jwt.getObject(BUSE_TOKEN)
        .then(obj => {
            if (obj.nickname && obj.TK && obj.Wallet) res.render('History', obj);
            else {
                res.redirect('/account');
            }
        })
        .catch(err => res.render('History', { email: undefined }));
});

app.get('/account', (req, res) => {
    const { BUSE_TOKEN } = req.cookies;
    jwt.getObject(BUSE_TOKEN)
        .then(obj => {
            res.render('account', obj);
        })
        .catch(err => res.redirect('login'));
});

app.get('/login', (req, res) => {
    const { BUSE_TOKEN } = req.cookies;
    jwt.getObject(BUSE_TOKEN)
        .then(obj => {
            res.redirect('/');
        })
        .catch(err => res.render('login', { email: undefined }));
});

app.get('/register', (req, res) => {
    const { BUSE_TOKEN } = req.cookies;
    jwt.getObject(BUSE_TOKEN)
        .then(obj => {
            res.redirect('/');
        })
        .catch(err => res.render('register', { email: undefined }));
});

app.get('/login/:code', (req, res) => {
    const { code } = req.params;
    let kq = -1;
    arrVerify.forEach((e, i) => {
        if (e == code) {
            kq = i;
        }
    }, this);
    if (kq == -1) return res.redirect('/login');
    else {
        arrVerify.splice(kq, 1);
        res.cookie('BUSE_TOKEN', code, { maxAge: 648000 });
        return res.redirect('/');
    }

});

app.get('/logout', (req, res) => {
    res.cookie('BUSE_TOKEN', '');
    res.redirect('/');
});

server.listen(3000, () => console.log('Server started!'));


io.on('connection', socket => {

    Coin.getCoins()
    .then( result => {
        socket.emit('SEND_COINS', result.rows);
    });
    
    socket.on('SEND_REGISTER_REQUEST', email => {
        const sql = `SELECT * FROM public."User" WHERE email = $1;`;
        queryDB(sql, [email])
            .then(result => {
                if (result.rows[0]) {
                    return socket.emit('RETURN_REGISTER_REQUEST', 0);
                }
                else {
                    const user = new User(email);
                    user.register();
                    return socket.emit('RETURN_REGISTER_REQUEST', 1);
                }
            })
    });

    socket.on('SEND_EDIT_REQUEST', info => {
        const user = new User(info.email, info.nickname, info.TK, info.Wallet);
        user.update()
            .then(() => {
                socket.emit('RETURN_EDIT_REQUEST', 1);
            })
            .catch(() => {
                socket.emit('RETURN_EDIT_REQUEST', 0);
            });
    });
});