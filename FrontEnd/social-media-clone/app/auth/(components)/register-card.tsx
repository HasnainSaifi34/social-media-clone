import React, { useState, ChangeEvent } from "react";
import { Dispatch, SetStateAction } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

import { createUserQuery } from "../(graphQL-queries)/queries";
import { RegisterTypes } from "../(types)/types";
export interface RegisterComponentProps {
  SetNewUser: Dispatch<SetStateAction<boolean>>;
}
const Register: React.FC<RegisterComponentProps> = () => {
  //  const [image , setSelectedImage] =useState<Buffer | string>('');
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [createUser] = useMutation(createUserQuery(), {
    onCompleted: (data) => {
      console.log("Mutation completed:", data);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const [formData, setFormData] = useState<RegisterTypes>({
    username: "",
    firstname: "",
    lastname: "",
    phoneno: null,
    password: "",
    profilepicture: null,
    age: null,
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
  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setImageUrl(dataUrl);

        const base64 = dataUrl.split(",")[1];
        const buffer = Buffer.from(base64, "base64");

        console.log("Image Buffer:", buffer);
        if (buffer!==null || undefined) {
          setFormData({
            ...formData,
            profilepicture: buffer || null,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert();
    const {
      username,
      firstname,
      lastname,
      phoneno,
      password,
      profilepicture,
      age,
      email,
    } = formData;
    try {
      const { data } = await createUser({
        variables: {
          username,
          firstname,
          lastname,
          phoneno,
          password,
          profilepicture,
          age,
          email,
        },
      });

      console.log("User created:", data.createUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }

    console.log("Form submitted:", formData);
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
          {formData.profilepicture && (
            <img
              // src={URL.createObjectURL(imageUrl)}
              alt="Profile Preview"
              className="mt-2 rounded-md shadow-md"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                border: "10px",
                borderRadius: "30%",
              }}
            />
          )}
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
          <div className="mb-4">
            <label
              htmlFor="phoneno"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              onContextMenu={handleContextMenu}
              type="number"
              id="phoneno"
              name="phoneno"
              value={formData.phoneno}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              onContextMenu={handleContextMenu}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Profile Picture */}
          <div className="mb-4">
            <label
              htmlFor="profilepicture"
              className="block text-sm font-medium text-gray-600"
            >
              Profile Picture
            </label>
            <input
              onContextMenu={handleContextMenu}
              type="file"
              id="profilepicture"
              name="profilepicture"
              onChange={handleProfilePictureChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
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
        </form>
      </div>
    </div>
  );
};

export default Register;
