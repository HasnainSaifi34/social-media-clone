import React, { useState, ChangeEvent } from "react";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@apollo/client";
import SignInWithGoogle from "./SignInGoogle";
import { CREATE_USER } from "../(graphQL-queries)/queries";
import { RegisterTypes } from "../(types)/types";
export interface RegisterComponentProps {
  SetNewUser: Dispatch<SetStateAction<boolean>>;
}
const Register: React.FC<RegisterComponentProps> = ({ SetNewUser}) => {
  //  const [image , setSelectedImage] =useState<Buffer | string>('');
  // const [imageUrl, setImageUrl] = useState<string | null>("");
  const [ShowPass, SetShowPass] = useState<boolean>(false);
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      console.log("Register Mutation completed:", data);
    },
    onError: (error) => {
      console.error( " Register Mutation error:", error);
    },
  });
  const openEyeImg = `http://localhost:3000/eye-view-interface-symbol-svgrepo-com.svg`;

  const HideEyeImg = "http://localhost:3000/eye-password-hide-svgrepo-com.svg";

  const [formData, setFormData] = useState<RegisterTypes>({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    age: "",
    email: "",
  });
  const handleContextMenu = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "age" ? parseInt(e.target.value, 10) : e.target.value,
    });
  };
  // const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   const reader = new FileReader();

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const dataUrl = e.target?.result as string;
  //       setImageUrl(dataUrl);

  //       const base64 = dataUrl.split(",")[1];
  //       const buffer = Buffer.from(base64, "base64");

  //       console.log("Image Buffer:", buffer);
  //       if (buffer!==null || undefined) {
  //         setFormData({
  //           ...formData,
  //           profilepicture: base64 || null,
  //         });
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const {
      username,
      firstname,
      lastname,

      password,
      age,
      email,
    } = formData;
    try {
      let { data } = await createUser({
        variables: {
          username,
          firstname,
          lastname,

          password,
          age,
          email,
        },
      });
      console.log("Form Data: ", formData);
      console.log("User Created :", data);

      console.log("User created:", formData);
      console.log(createUser);
      console.log(CREATE_USER);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <div
          style={{
            display: "flex",
            gap: "2px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Register
          </h1>
        </div>
        <form>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              onContextMenu={handleContextMenu}
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-600"
            >
              First Name
            </label>
            <input
              onContextMenu={handleContextMenu}
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-600"
            >
              Last Name
            </label>
            <input
              onContextMenu={handleContextMenu}
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Phone Number */}

          {/* Password */}
          <div className="mb-4 ">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="flex items-center justify-center">
              <input
                onContextMenu={handleContextMenu}
                type={ShowPass ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              <img
                onClick={() => {
                  SetShowPass(!ShowPass);
                }}
               src={ShowPass? openEyeImg: HideEyeImg}
              alt="image not available"
              style={{width:"30px",height:"30px"}}
              >
                
              </img>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="mb-4">
            <label
              htmlFor="profilepicture"
              className="block text-sm font-medium text-gray-600"
            >
              Profile Picture
            </label>

            {/* Add a preview for the profile picture */}
          </div>

          {/* Age */}
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-600"
            >
              Age
            </label>
            <input
              onContextMenu={handleContextMenu}
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              onContextMenu={handleContextMenu}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring focus:border-primary-300 bg-blue-400"
            onClick={handleSubmit}
          >
            Register
          </button>
          <div className="flex items-center justify-center ">
            <br />
            Or
          </div>
        </form>
        <SignInWithGoogle />
        Already a user ? <a onClick={()=>SetNewUser(false)} style={{textAlign:"center",cursor:"pointer",}}> Login </a>
      </div>
    </div>
  );
};

export default Register;
