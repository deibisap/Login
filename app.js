const express = require('express');
const app = express();

app.get ('/',(req,res)=> {
    res.send('HOLA MUNDO');

})

app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:3000');
})