const express = require('express');
const bodyParser =require('body-parser');
const api = require('./router/api');
const cors = require('cors')
const PORT = 3000;
const app = express();
app.use(cors())
app.use(bodyParser.json())

app.use('/api',api)
app.get('/', function(req,res){
    res.send('From the server')
});

app.listen(PORT, (req,res)=>{
    console.log(PORT + "is running")
});

