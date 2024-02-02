const { pool } = require("../model/pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const util = require("util");
const { Buffer } = require("buffer");
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
  const { username, firstname, lastname, password, age, email } = args;

  try {
    const saltRounds = 10;
    if (!password) {
      throw new Error("Password is required.");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const data = {
      UserName: username,
      FirstName: firstname,
      LastName: lastname,
      email: email,
      PassWord: hashedPassword,
      Age: age,
    };

    const options = {
      expiresIn: "7d",
    };

    const jwttoken = jwt.sign(data, secretKey, options);

    const query =
      "INSERT INTO userAuth (UserName, FirstName, LastName, PhoneNo, jwtToken, PassWord, Age, email, ProfilePicture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";

    const values = [
      username,
      firstname,
      lastname,
      null,
      jwttoken,
      hashedPassword,
      age,
      email,
      null,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const status = {
        status: true,
        message: "User Created",
        jwttoken: result.rows[0].jwttoken,
      };
      console.log(status);
      return status;
    } else {
      const status = {
        status: false,
        message: "Error Creating User",
        jwttoken: null,
      };
      console.log(status);
      return status;
    }
  } catch (error) {
    const status = {
      status: false,
      message: `Error Creating User: ${error}`,
      jwttoken: null,
    };
    console.error(status);
    return status;
  }
};

const Authentication = async (username, password) => {
  try {
    const userQuery = "SELECT UserName, FirstName, LastName,email,Age, password FROM userAuth WHERE username = $1";
    const userResult = await pool.query(userQuery, [username]);
    if (!userResult.rows[0]) {
      return { status: false, message: "User not found" };
    }


    let storedHashedPassword=userResult.rows[0].password;
    const passwordMatch = await compareAsync(password, storedHashedPassword);

    if (passwordMatch) {
      console.log("Password is correct");

      const { UserName, FirstName, LastName, email, PassWord, Age } =userResult.rows[0];
     
      const JWTdata = {
        UserName,
        FirstName,
        LastName,
       
        email,
        PassWord,
        Age,
      };

      const options = {
        expiresIn: "7d",
      };

      const newJWToken = jwt.sign(JWTdata, secretKey, options);
      try {
        const updateQuery = `
          UPDATE userAuth
          SET jwttoken = $1
          WHERE username = $2
          RETURNING *;
        `;

        const updateValues = [newJWToken, username];
        const updateResult = await pool.query(updateQuery, updateValues);

        return {
          status: true,
          message: "Password is correct",
          jwttoken: newJWToken.toString(),
        };
      } catch (e) {
        console.error("Internal server error:", e);
        return { status: false, message: "Internal server error" };
      }
    } else {
      console.log("Incorrect password");
      return { status: false, message: "Incorrect password" };
    }
  } catch (e) {
    console.error("Error querying user:", e);
    return { status: false, message: "Internal server error" };
  }
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  Authentication,
};
