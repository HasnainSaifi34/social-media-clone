const { gql } = require('apollo-server');

const typeDefs = `
  type User {
    userid: ID!
    username: String!
    firstname: String!
    lastname: String!
    jwttoken: String
    password: String
    age: Int
    publicaccount:Boolean
    isonline:Boolean
    email:String!
  }

  type AuthStatus {
    status:Boolean!
    message:String!
    jwttoken:String
  }
  type Query {
    getUserById(UserId: ID!): User
    getUsers:[User]
  }

  type Mutation {
    createUser(
    username: String!
    firstname: String!
    lastname: String!
    password: String
    age: Int
    email:String!

    ): User
    login(
      username:String!
      password:String!
    
    ):AuthStatus  
  }
`;
module.exports={
    typeDefs
}