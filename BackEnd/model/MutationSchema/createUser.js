const createUser = `
createUser(
    username: String!
    firstname: String!
    lastname: String!
    password: String
    age: Int
    email:String!


  ): AuthStatus

`


module.exports={
    createUser
}