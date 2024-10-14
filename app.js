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


// RUTAS
app.get ('/',(req,res)=> {
    res.render('index',{msg:'ESTO ES UN MENSAJE DESDE NODE'});

})
app.get ('/login',(req,res)=> {
    res.render('login');

})
 
app.get ('/register',(req,res)=> {
    res.render('register');

})


// 10. registro (acá capturo los datos del formulario)

app.post('/register', async (req, res) => {
    const user= req.body.user;
    const name= req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    connection.query('INSERt INTO users SET ?' ,{user:user, name:name, rol:rol, pass:passwordHaash}, async (error, results)=>{

            if(error){
                console.log(error);
            }else{
                res.send("Registro exitoso")
            }
    })
    
});


app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:3000');
}) 