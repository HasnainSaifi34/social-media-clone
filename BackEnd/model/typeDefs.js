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
    email:String!
  }

  type Query {
    getUserById(UserId: ID!): User
    getUsers:[User]
    login:User
  }

  type Mutation {
    createUser(
    username: String!
    firstname: String!
    lastname: String!
    phoneno: String
    
    password: String
    profilepicture: String 
    age: Int
    email:String!

    ): User
    login(
      username:String!
      password:String!
    ):User
  }
`;
module.exports={
    typeDefs
}