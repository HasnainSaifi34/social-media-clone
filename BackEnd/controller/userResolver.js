const { pool } = require("../model/pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const util = require('util');
const compareAsync = util.promisify(bcrypt.compare);
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
    username,
    firstname,
    lastname,
    phoneno,
    password,
    profilepicture,
    age,
    email,
  } = args;
  const hasshedpass = await bcrypt.hash(password, 10);

  const data = {
    UserName: username,
    FirstName: firstname,
    LastName: lastname,
    PhoneNo: phoneno,
    email: email,
    PassWord: hasshedpass,
    ProfilePicture: profilepicture,
    Age: age,
  };
  const options = {
    expiresIn: "7d",
  };
  const jwttoken = jwt.sign(data, secretKey, options);

  const query =
    "INSERT INTO userAuth (UserName, FirstName, LastName, PhoneNo, jwtToken, PassWord, ProfilePicture, Age, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *";

  const values = [
    username,
    firstname,
    lastname,
    phoneno,
    jwttoken,
    hasshedpass,
    profilepicture,
    age,
    email,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};


const Authentication = async (username, password) => {
  try {
    const QUERY = "SELECT jwttoken FROM userAuth WHERE username = $1";
    const result = await pool.query(QUERY, [username]);
    let storedHashedPassword = "";

    try {
      const decoded = await jwt.verify(result.rows[0].jwttoken, secretKey);
      if (decoded) {
        storedHashedPassword = decoded.PassWord;
      }
    } catch (error) {
      console.error("JWT verification failed:", error.message);
    }

    const passwordMatch = await compareAsync(password, storedHashedPassword);

    if (passwordMatch) {
      console.log("Password is correct");
      return { status: true, message: "Password is correct" };
    } else {
      console.log("Incorrect password");
      return { status: false, message: "Incorrect password" };
    }
  } catch (e) {
    console.error("Internal server error:", e);
    return { status: false, message: "Internal server error" };
  }
};
module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  Authentication,
};
