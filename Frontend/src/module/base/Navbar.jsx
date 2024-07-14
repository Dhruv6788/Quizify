// src/App.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    console.log(localStorage.getItem("accessToken"));
  }, []);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white font-[ppm-r]  sticky top-0 z-50">
      <nav className="flex items-center justify-between px-2 py-3">
        <h1 className="text-black font-[ppm-r] text-3xl">Quizify</h1>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-[black] focus:outline-none"
          >
            {isMenuOpen ? null : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="#000"
                viewBox="0 0 24 24"
                stroke="#000"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 font-[ppm-r] z-50">
          <div className="flex">
            <div className="bg-slate-800 fixed top-0 right-0 w-full h-screen">
              <div className="flex justify-between items-center px-3 py-3">
                <h1 className="text-[#ffffff86] font-[ppm-r] font-thin text-3xl box">
                  Quizify
                </h1>
                <div className="" onClick={toggleMenu}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-11 w-11"
                    fill="#000"
                    viewBox="0 0 24 24"
                    stroke="#ffffff83"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col space-y-2 items-start text-5xl uppercase font-[ppm-r] font-thin mt-24 px-3">
                <Link to="/home" className="text-[#ffffff96]">
                  Home
                </Link>
                {localStorage.getItem("accessToken") ? (
                  <Link to="/profile" className="text-[#ffffff96]">
                    Profile
                  </Link>
                ) : null}
                {localStorage.getItem("accessToken") ? (
                  <Link to="/dashboard" className="text-[#ffffff96]">
                    Dashboard
                  </Link>
                ) : null}
                <Link to="/about" className="text-[#ffffff83]">
                  About us
                </Link>
                <Link to="/developers" className="text-[#99dd999d]">
                  Meet Dev's
                </Link>
              </div>
              {!localStorage.getItem("accessToken") ? (
                <div className="text-[#ffffff56] text-5xl flex flex-col space-y-2 font-[g-medium] mt-10 px-3">
                  <Link to="/login" className="font-[g-light]">
                    Sign In
                  </Link>
                  <Link to="/login" className="font-[g-light]">
                    New Account
                  </Link>
                </div>
              ) : (
                <div className="text-[#ffffff56] text-5xl  space-y-2 font-[g-medium] mt-10 px-3">
                  <button
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      navigate("/login");
                    }}
                    className="font-[g-light] capitalize"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
