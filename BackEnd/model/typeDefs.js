const { gql } = require('apollo-server');

const typeDefs = `
  type User {
    userid: ID!
    username: String!
    firstname: String!
    lastname: String!
    phoneno: String
    jwttoken: String
    password: String
    profilepicture: String 
    age: Int
    publicaccount:Boolean
    isonline:Boolean
  }

  type Query {
    getUserById(UserId: ID!): User
    getUsers:[User]
  }

  type Mutation {
    createUser(
      userid: ID!
    username: String!
    firstname: String!
    lastname: String!
    phoneno: String
    jwttoken: String
    password: String
    profilepicture: String 
    age: Int
    publicaccount:Boolean
    isonline:Boolean
    ): User
  }
`;
module.exports={
    typeDefs
}