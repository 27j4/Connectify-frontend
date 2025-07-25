import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateAvatar = () => {
  const [postimg, setPostimg] = useState(null);
  const handleAvatarChange = (event) => {
    setPostimg(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const getLocalStorageItem = JSON.parse(localStorage.getItem("user"));
    try {
      await axios.post(
        `${import.meta.env.VITE_backend_URL}/users/UpdateAvatar`,
        { Avatar: postimg, hello: "kj" },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getLocalStorageItem?.Token}`,
          },
        }
      );
      setPostimg(null);
      toast.success("done");
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-12 my-20 bg-gray-400 rounded-md p-4">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Upload an Image</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Select an image file to upload.
        </p>
      </div>
      <form className="space-y-4">
        <div className="flex justify-center items-center gap-6">
          <label className="font-semibold" htmlFor="image">
            Image - {" "}
          </label>
          <input
            id="image"
            required
            accept="image/*"
            type="file"
            onChange={handleAvatarChange}
          />
        </div>
        <button
          className="w-full bg-blue-500 p-1 rounded-md hover:bg-blue-700"
          type="submit"
          onClick={handleSubmit}
        >
          Upload
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateAvatar;
