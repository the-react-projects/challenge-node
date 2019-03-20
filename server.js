const express = require ('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');

const Kid = require('./models/Kid');
const User = require('./models/User');

require('dotenv').config({path: 'variables.env'});

// GraphQL-Express SetUp
const { ApolloServer } = require('apollo-server-express');

// Connect to database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(()=> console.log('Atlas dB connected'))
  .catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

// Initializes://

const app = express();

// Cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

//jwt authentication
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token){
    try{
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    }
    catch(err) {
      console.error(err);
    } 
  }
  next();
});

/** */
const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context:({req,res})=>({
    CurrentUser: req.currentUser,
    Kid,
    User
  })
});

// Application
server.applyMiddleware({app});

// set this value bellow, in 'variables.env' for deploy
// NODE_ENV=production
// PORT=80

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
  console.log(`Server Listening on http://localhost:${PORT}${server.graphqlPath}`);
});
