const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/index");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://HashirKhan:password@cluster0.ulzxi.mongodb.net/BookStore",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000);
