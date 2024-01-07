const { pool } = require("../model/pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_TOKEN;
// Function to get a user by ID
const getUserById = async (UserId) => {
  const query = "SELECT * FROM userAuth WHERE UserId = $1";
  const result = await pool.query(query, [UserId]);
  return result.rows[0];
};

// Function to get all users
const getAllUsers = async () => {
  const query = "SELECT * FROM userAuth";
  const result = await pool.query(query);
  return result.rows;
};

// Function to create a new user
const createUser = async (args) => {
  const {
    UserName,
    FirstName,
    LastName,
    PhoneNo,
    PassWord,
    ProfilePicture,
    Age,
  } = args;
  const data = {
    UserName: UserName,
    FirstName: FirstName,
    LastName: LastName,
    PhoneNo: PhoneNo,

    PassWord: PassWord,
    ProfilePicture: ProfilePicture,
    Age: Age,
  };
  const options = {
    expiresIn: "7d",
  };
  const jwttoken = jwt.sign(data, secretKey, options);
  const hasshedpass = bcrypt.hash(10, PassWord);

  const query =
    "INSERT INTO userAuth (UserName, FirstName, LastName, PhoneNo, jwtToken, PassWord, ProfilePicture, Age) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

  const values = [
    UserName,
    FirstName,
    LastName,
    PhoneNo,
    jwtToken,
    hasshedpass,
    ProfilePicture,
    Age,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};
module.exports = {
  getUserById,
  getAllUsers,
  createUser,
};
