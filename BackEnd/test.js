const {pool} = require('./model/pool')


const getAllUsers = async () => {
    const query = 'SELECT * FROM userAuth';
    const result = await pool.query(query);
    return result.rows;
  };
const userDataFun = async()=>{
    const userData = await getAllUsers();
    console.log(userData);
}
userDataFun();