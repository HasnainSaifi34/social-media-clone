import { gql } from "@apollo/client";
export const createUserQuery = ()=> {
 const CREATE_USER = gql`
 mutation CreateUser($username: String!, $firstname: String!, $lastname: String!,  $password: String!,  $age: Int, $email:String!) {
  createUser(
    username: $username,
    firstname: $firstname,
    lastname: $lastname,
    password: $password,
    age: $age,
    email:$email
  ) {
    status
    jwttoken
    message
    data {
      userid
      email
      firstname
      lastname
      
    }
  }
}
`;
return CREATE_USER;
}


