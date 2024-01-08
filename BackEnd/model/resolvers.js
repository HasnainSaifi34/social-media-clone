const { getUserById,
  getAllUsers,
  createUser,Authentication} =require('../controller/userResolver');
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
      }
      
    },
    Mutation: {
      createUser: (_, args) => createUser(args),
      login: async (_,{username , password})=>  Authentication(username, password)


    },
  };
  
  module.exports = {
    
    resolvers
  };
