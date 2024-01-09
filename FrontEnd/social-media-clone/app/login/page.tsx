"use client"
import { NextPage } from "next";
import { useQuery, gql, DocumentNode, TypedDocumentNode } from '@apollo/client';
import { useEffect, useState } from "react";

type getUsersType ={
  firstname:string,
  lastname:string,
  age:number,
  password:string,
  jwttoken:string
 }

const getUsers:(DocumentNode | TypedDocumentNode <{getUsers:getUsersType[]}>) = gql`
  query GetUsers {
    getUsers {
      firstname
      lastname
      age
      password
      jwttoken
      
    }
  }
`;

const login: NextPage = () => {
  const { loading, error, data } = useQuery<{getUsers:getUsersType[]}>(getUsers);

  const [userData, setUserData] = useState<getUsersType[] | null >(null);

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

export default login;
