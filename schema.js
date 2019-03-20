const {gql} = require('apollo-server-express');

exports.typeDefs = gql `
  type Kid {
    _id: ID
    firstName: String!
    lastName: String!
    age: String
    registerDate: String
    username: String
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    joinDate: String
  }

  type Token {
    token: String!
  }

  type Query {
    getAllKids: [Kid]
    getKid(_id: ID!): Kid

    getCurrentUser: User

    getUserKids(username: String!):[Kid]
  }

  type Mutation {
    addKid(firstName: String!, lastName: String!, age: String, registerDate: String, username: String): Kid
    
    deleteUserKid(_id:ID):Kid

    signinUser(username: String!, password: String!): Token

    signupUser(username: String!, email: String!, password: String!): Token
  }

`;
