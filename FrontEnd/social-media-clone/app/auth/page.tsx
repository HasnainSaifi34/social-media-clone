import { NextPage } from "next";
import LoginCard from "./(components)/login-card";
import {useState, useEffect} from 'react'
const Login: NextPage = () => {
  return (
    <>
      <div className="login-wrapper bg-gray-100">
        <LoginCard />
      </div>
    </>
  );
};

export default Login;
