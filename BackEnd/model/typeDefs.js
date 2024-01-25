const { gql } = require('apollo-server');

const typeDefs = `
scalar Upload
  type User {
    userid: ID!
    username: String!
    firstname: String!
    lastname: String!
    phoneno: String
    jwttoken: String
    password: String
    profilepicture: [Upload] 
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
    phoneno: String
    
    password: String
    profilepicture: String 
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