const {login}=require('./login')
const {createUser}=require('./createUser')
const Mutation = `
type Mutation {
${login}
${createUser}
}
`


module.exports ={
    Mutation
}