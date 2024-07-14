import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../base/Navbar";
import EditProfileModal from "./EditProfileModal"; // Import your EditProfileModal component
import ProfilePic from '../../assets/ProfilePic.png'

const Profile = () => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_GET_CURRENT_PROFILE;
    const requestParameters = {
      method: "GET",
      headers: {
        Authorization: "JWT " + localStorage.getItem("accessToken"),
      },
    };

    const getUserDetails = async () => {
      try {
        const response = await fetch(apiUrl, requestParameters);
        const jsonData = await response.json();
        setUser(jsonData);
        console.log(jsonData);
        localStorage.setItem("role", jsonData.role);
        setRole(jsonData.role);
        // navigateTo('/dashboard');
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetails();
  }, []);

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 font-[ppm-r]">
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-bold text-xl mb-2">{user.name}</h2>
                <p className="text-gray-700 text-base">{user.email}</p>
                <p className="text-gray-700 text-base">Gender: {user.gender}</p>
                <p className="text-gray-700 text-base">
                  Enrollment No: {user.enrollment_no}
                </p>
                <p className="text-gray-700 text-base">Role: {role}</p>
                <p className="text-gray-700 text-base">Bio: {user.bio}</p>
                <button
                  onClick={handleEditProfile}
                  className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Edit Profile
                </button>
              </div>
              <div>
                <img
                  className="h-24 w-24 rounded-full object-cover"
                  src={ProfilePic}
                  alt="Profile"
                />
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold mb-2">Quiz History</h3>
              <ul className="list-disc pl-4">
                {user.created_quizzes &&
                  user.created_quizzes.map((quiz, index) => (
                    <li key={index} className="text-gray-700">
                      {quiz}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onUpdateUser={setUser} // Pass a function to update the user object after editing
        />
      )}
    </>
  );
};

export default Profile;
