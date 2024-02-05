const {GeneralTypes} =require('./GeneralTypes/index')
const {Mutation} =require('./MutationSchema/index')

const typeDefs = `
 ${GeneralTypes}
  type Query {
    getUserById(UserId: ID!): User
    getUsers:[User]
  }

  ${Mutation}
`;
module.exports = {
  typeDefs,
};
