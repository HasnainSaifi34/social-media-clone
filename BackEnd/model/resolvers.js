const {pool} = require('./pool')

// Function to get a user by ID
const getUserById = async (UserId) => {
    const query = 'SELECT * FROM userAuth WHERE UserId = $1';
    const result = await pool.query(query, [UserId]);
    return result.rows[0];
  };
  
  // Function to get all users
  const getAllUsers = async () => {
    const query = 'SELECT * FROM userAuth';
    const result = await pool.query(query);
    console.log('Result:', result.rows);
    return result.rows;
  };
  
  // Function to create a new user
  const createUser = async (args) => {
    const {
      UserName,
      FirstName,
      LastName,
      PhoneNo,
      jwtToken,
      PassWord,
      ProfilePicture,
      Age,
    } = args;
  
    const query =
      'INSERT INTO userAuth (UserName, FirstName, LastName, PhoneNo, jwtToken, PassWord, ProfilePicture, Age) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  
    const values = [UserName, FirstName, LastName, PhoneNo, jwtToken, PassWord, ProfilePicture, Age];
  
    const result = await pool.query(query, values);
    return result.rows[0];
  };
  const resolvers = {
    Query: {
      getUserById:(_, { UserId }) => getUserById(UserId),
      getUsers:  async () => {
        try {
          const users = await getAllUsers();
          return users;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch users');
        }
      },
    },
    Mutation: {
      createUser: (_, args) => createUser(args),
    },
  };
  
  module.exports = {
    getUserById,
    getAllUsers,
    createUser,
    resolvers
  };
