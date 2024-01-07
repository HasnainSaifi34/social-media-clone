const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    UserId: ID!
    UserName: String!
    FirstName: String!
    LastName: String!
    PhoneNo: String
    jwtToken: String
    PassWord: String
    ProfilePicture: String # Assuming you store the picture path or URL as a string
    Age: Int
  }

  type Query {
    getUserById(UserId: ID!): User
    getUsers: [User]
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
    ): User
  }
`;
module.exports={
    typeDefs
}