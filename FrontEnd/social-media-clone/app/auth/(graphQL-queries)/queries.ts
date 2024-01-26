import { gql } from "@apollo/client";
export const createUserQuery = ()=> {
 const CREATE_USER = gql`
 scalar Buffer
  mutation CreateUser(
    $username: String!,
    $firstname: String!,
    $lastname: String!,
    $phoneno: String,
    $password: String,
    $profilepicture: Buffer,
    $age: Int,
    $email: String!
  ) {
    createUser(
      username: $username,
      firstname: $firstname,
      lastname: $lastname,
      phoneno: $phoneno,
      password: $password,
      profilepicture: $profilepicture,
      age: $age,
      email: $email
    ) { 
        userid
        jwttoken
        username
    }
  }
`;
return CREATE_USER;
}

