const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require("./graphql/schema/index"); 
const graphqlResolvers = require("./graphql/resolvers/index"); 
const cors = require("cors"); 
const app = express();

app.use(bodyParser.json());


app.use(cors()); 


app.use(
  '/graphql',
  graphqlHTTP({
    schema:graphqlSchema ,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0.pzhj1.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true`
  , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

  })
  .then(() => {
    app.listen(8000);
    console.log("app is running")
  })
  .catch(err => {
    console.log(err);
  });