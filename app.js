const json = require('express');
const express = require('express');
const session = require('express-session');
const myconnection = require('express-myconnection')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const loginRoutes = require('./routes/login-route'); 

app.set('views', __dirname + '/views');
app.set('view engine','ejs');


app.use(express.urlencoded({extended:false}));
app.use(express(json));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jugueteria',
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use('/', loginRoutes);


app.use('/',require('./router'));

app.listen(5000,()=>{
    console.log('Servidor activo en puesto 5000');
});

