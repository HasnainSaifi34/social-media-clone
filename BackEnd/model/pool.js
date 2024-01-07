const { Pool } = require('pg');
require('dotenv').config();
const pool1 = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'socialmedia',
  password: process.env.PASS,
  port: 5432, 
});


module.exports = {
    pool1,
    typeDefs
  };
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
  

 /*  
CREATE TABLE userAuth (
    UserId SERIAL PRIMARY KEY,
    UserName VARCHAR(255) UNIQUE,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    PhoneNo VARCHAR(20),
    jwtToken VARCHAR(1500),
    PassWord VARCHAR(1000),
    ProfilePicture BYTEA,
    Age INT CHECK (Age >= 18) -- Add the CHECK constraint here
);
*/ 