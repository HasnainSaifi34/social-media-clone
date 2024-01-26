import React, { Dispatch, SetStateAction } from 'react';

export interface authStatType {
  AuthStatus: boolean;
  Message: string;
  jwttoken: string;
}

export interface LoginCardProps {
  setAuthStatus: Dispatch<SetStateAction<authStatType | {}>>;
  SetNewUser: Dispatch<SetStateAction<boolean>>;
}
 
export interface RegisterTypes{
  username: string,
  firstname: string,
  lastname:string,
    phoneno: number |null,
  password: string,
  profilepicture: Buffer | null,
  age: number | null,
  email: string,
}
// export interface UserQueryObj {
//   userid: number | undefined
//   username: string | undefined
//   firstname: string | undefined
//   lastname: string | undefined
//   phoneno: string | undefined
//   jwttoken: string | undefined
//   password: string | undefined
//   profilepicture: string  | undefined
//   age: number | undefined
//   publicaccount:boolean | undefined
//   isonline:Boolean | undefined
//   email:string | undefined
// }

