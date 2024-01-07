const { gql } = require('apollo-server');

const typeDefs = `
  type User {
    UserId: ID!
    UserName: String!
    FirstName: String!
    LastName: String!
    PhoneNo: String
    jwtToken: String
    PassWord: String
    ProfilePicture: String 
    Age: Int
    publicAccount:Boolean
    isOnline:Boolean
  }

  type Query {
    getUserById(UserId: ID!): User
    getUsers:[User]
  }

  type Mutation {
    createUser(
      UserName: String!
      FirstName: String!
      LastName: String!
      PhoneNo: String
      jwtToken: String
      PassWord: String
      ProfilePicture: String
      Age: Int
      publicAccount:Boolean
      isOnline:Boolean
    ): User
  }
`;
module.exports={
    typeDefs
}