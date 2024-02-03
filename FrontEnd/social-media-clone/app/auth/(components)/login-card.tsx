"use client";
import React, { Dispatch, SetStateAction, useState, ChangeEvent } from "react";
import { LoginCardProps } from "../(types)/types";
import { LOGIN_MUTATION } from "../(graphQL-queries)/queries";
import { useMutation } from "@apollo/client";
const LoginForm: React.FC<LoginCardProps> = ({ setAuthStatus, SetNewUser }) => {
  interface LoginData {
    username: string;
    password: string;
  }
  const initialLoginData: LoginData = {
    username: "",
    password: "",
  };
  const [LoginData, setLoginData] = useState<LoginData>(initialLoginData);
  const HandleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {

    if (type == "username") {
      setLoginData({
        username: e.target.value,
        password: LoginData.password,
      });
    } else if (type == "password") {
      setLoginData({
        username: LoginData.username,
        password: e.target.value,
      });
    }
  };
  const [Login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log("Login Mutation completed:", data);
    },
    onError: (error) => {
      console.error(" Login Mutation error:", error);
    },
  });

  const HandleLogin = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    
    try {
      let { data } = await Login({
        variables: LoginData,
      });
      if(data){
      console.log("login success full :",data);
      }else {
        console.log("Login Failed: Internal Server Error")
      }
    } catch (e) {
      console.log("Login Failed :",e);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Login</h1>
        <form action="" method="post">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              UserName
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 w-full border rounded-md"
              value={LoginData.username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                HandleChange(e, "username")
              }
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                HandleChange(e, "password")
              }
              className="mt-1 p-2 w-full border rounded-md"
              value={LoginData.password}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 text-primary-600"
                
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-primary-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring focus:border-primary-300"
            onClick={HandleLogin}
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-primary-600 hover:underline"
            onClick={() => SetNewUser(true)}
          >
            {" "}
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
