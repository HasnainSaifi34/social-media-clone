
const {ApolloServer}=require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const {resolvers} = require('./model/resolvers.js')
const port = 3050;
const cors = require('cors')
require('dotenv').config();
const pool = require('./model/pool.js');
const typeDefs = require('./model/typeDefs.js');
const StartServer = async ()=>{
    const express = require('express');
    const server = express();
    const apolloServer = new ApolloServer({
       typeDefs:`${typeDefs.typeDefs}`,
       resolvers
    
    })
    await apolloServer.start();
    server.use(express.json());
    server.use(cors());
    server.use('/graphql',expressMiddleware(apolloServer));

    server.listen(port,()=>{console.log("server has started ")});
    server.get('/uplods', async (req, res) => {
        console.log(`server is running on port ${port}`);
        res.send(`<h1>server is running<h1/>`);
    });
    
}
StartServer().catch((e)=>console.log(e));

