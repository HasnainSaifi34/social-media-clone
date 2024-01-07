const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'socialmedia',
  password: process.env.PASS,
  port: 5432, 
});


module.exports = {
    pool,
    
  };

  

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