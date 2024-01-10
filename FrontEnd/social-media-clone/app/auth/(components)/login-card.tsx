import React, { Dispatch, SetStateAction } from 'react';
import { authStatType } from '../(types)/types';
interface LoginCardProps {
    setAuthStatus: Dispatch<SetStateAction<authStatType | {}>>;
    SetNewUser: Dispatch<SetStateAction<boolean>>;
  }
const LoginForm:React.FC<LoginCardProps>  = ({setAuthStatus , SetNewUser}) => {
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">Login</h1>
                <form action="#" method="post">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" name="remember" className="h-4 w-4 text-primary-600" />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
                        </div>
                        <a href="#" className="text-sm text-primary-600 hover:underline">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring focus:border-primary-300">
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account? <a href="#" className="text-primary-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
