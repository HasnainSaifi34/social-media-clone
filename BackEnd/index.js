const express = require('express');
const server = express();
const port = 3050;
require('dotenv').config();
const pool = require('./model/pool.js')
server.listen(port,()=>{console.log("server has started ")});
server.get('/', async (req, res) => {
    console.log(`server is running on port ${port}`);
    res.send(`<h1>server is running<h1/>`);
});

server.get('/user', async(req,res)=>{res.send("you are a user")})



