const express = require('express');
const { graphql } = require('graphql');
const {schema} =  require('./schema/schema')

const { graphqlHTTP } = require('express-graphql');
const app = express();

app.use('/graphql', graphqlHTTP({
    schema, // using es6, same as -- >schema: schema
    graphiql : true
}));


const port = 4000;

app.listen(port,()=>{
    console.log(`Listening to ${port}`)
});