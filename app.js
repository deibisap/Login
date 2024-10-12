//invocamos express

const express = require('express');
const app = express();

//2 seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json()); 

//3 invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});


//4. el directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// 5 establecer motor de plantillas
app.set('view engine', 'ejs');

//6 invocanos a bcryptjs
const bcryptjs = require('bcryptjs');

//7 Variable de session
const session = require('express-session');
app.use(session({
        secret:'secret',
        resave: true,
        saveUninitialized: true
}));
 

//8 invocar modulo de base de datos

const connection = require('./database/db');


console.log(__dirname);
app.get ('/',(req,res)=> {
    res.send('HOLA MUNDO');

})

app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:3000');
}) 