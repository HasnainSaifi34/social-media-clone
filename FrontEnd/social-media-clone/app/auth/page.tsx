"use client"
import { NextPage } from "next";
import LoginCard from "./(components)/login-card";
import {useState, useEffect} from 'react'
import { authStatType } from "./(types)/types";
import Register from "./(components)/register-card";
const Login: NextPage = () => {

  const [authStatus , setAuthStatus] =useState<authStatType | {}>({});
  const [NewUser, SetNewUser] = useState<boolean>(true)
  return  !NewUser?(
    <>
      <div className="login-wrapper bg-gray-100">
        <LoginCard setAuthStatus={setAuthStatus} SetNewUser={SetNewUser} />
      </div>
    </>
  ):(
<div className="login-wrapper bg-gray-100">
  <Register SetNewUser={SetNewUser}/>
</div>
  )
};

export default Login;
