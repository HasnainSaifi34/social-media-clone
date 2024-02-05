const TypeUser = `
type User {
    userid: ID!
    username: String!
    firstname: String!
    lastname: String!
    jwttoken: String
    password: String
    age: Int
    publicaccount:Boolean
    isonline:Boolean
    email:String!
  }
`

module.exports={
    TypeUser
}