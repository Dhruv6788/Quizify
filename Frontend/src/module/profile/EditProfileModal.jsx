import React, { useState } from "react";

const EditProfileModal = ({ user, onClose, onUpdateUser }) => {
  const [editedUser, setEditedUser] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender,
    enrollment_no: user.enrollment_no,
    bio: user.bio,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = ""

    onUpdateUser(editedUser);
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 flex justify-center items-center px-6 font-[ppm-r]">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full sm:max-w-lg">
        <div className="px-6 py-4">
          <div className="sm:flex sm:items-start">
            <div className="text-center sm:text-left w-full">
              <h3 className="font-bold text-3xl leading-6 text-gray-900 mb-4">
                Edit Profile
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    value={editedUser.gender}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="enrollment_no"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enrollment No
                  </label>
                  <input
                    type="text"
                    name="enrollment_no"
                    id="enrollment_no"
                    value={editedUser.enrollment_no}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    value={editedUser.bio}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  ></textarea>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
