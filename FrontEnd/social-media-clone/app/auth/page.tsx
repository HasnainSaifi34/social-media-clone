import { NextPage } from "next";
import LoginCard from "./(components)/login-card";
import {useState, useEffect} from 'react'
import { authStatType } from "./(types)/types";
const Login: NextPage = () => {

  const [authStatus , setAuthStatus] =useState<authStatType | {}>({});
  const [NewUser, SetNewUser] = useState<boolean>(false)
  return (
    <>
      <div className="login-wrapper bg-gray-100">
        <LoginCard setAuthStatus={setAuthStatus} SetNewUser={SetNewUser} />
      </div>
    </>
  );
};

export default Login;
