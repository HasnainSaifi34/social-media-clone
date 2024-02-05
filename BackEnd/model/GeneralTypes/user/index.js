const {AuthStatus} = require('./AuthStatus')
const{RegisterData} =require('./RegisterData')
const {TypeUser} =require('./User')
const GeneralUserTypes = `
${AuthStatus}
${RegisterData}
${TypeUser}
`


module.exports ={
    GeneralUserTypes
}