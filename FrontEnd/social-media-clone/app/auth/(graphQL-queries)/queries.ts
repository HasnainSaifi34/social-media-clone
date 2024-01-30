import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $firstname: String!, $lastname: String!, $email: String!, $password: String, $age: Int) {
  createUser(username: $username, firstname: $firstname, lastname: $lastname, email: $email, password: $password, age: $age) {
    jwttoken
    userid
  }
}
`;
