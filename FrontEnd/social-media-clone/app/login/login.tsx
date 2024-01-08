import { NextPage } from "next";
import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from "react";

const getUsers = gql`
  query GetUsers {
    getUsers {
      firstname
      lastname
      password
      jwttoken
    }
  }
`;

const LoginComponent: NextPage = () => {
  const { loading, error, data } = useQuery(getUsers);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!loading && data) {
      setUserData(data);
      console.log(data);
    }
  }, [loading, data]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {userData && (
        <>
          <h1>Data is loaded</h1>
          {console.log(userData)}
        </>
      )}
    </>
  );
};

export default LoginComponent;
