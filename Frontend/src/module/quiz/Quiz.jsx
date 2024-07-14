import React, { useEffect, useState } from "react";
import Navbar from "../base/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import quizIcon from "../../assets/quiz.svg";
import editIcon from "../../assets/editbtn.svg";
import resultIcon from "../../assets/result.svg";
import deletebtn from "../../assets/deletebtn.svg";
import startbtn from "../../assets/startbtn.svg";

const Quiz = () => {
  const { subject_code, quiz_slug } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_GET_SINGLE_QUIZ + `${quiz_slug}/`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "JWT " + localStorage.getItem("accessToken"),
      },
    };
    const getSingleQuiz = async () => {
      try {
        const response = await fetch(apiUrl, requestOptions);
        const jsonData = await response.json();
        setQuiz(jsonData);
        console.log(jsonData)
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    getSingleQuiz();
  }, [quiz_slug]);


  const handleDelete = async () => {
    const apiUrl = import.meta.env.VITE_CREATE_QUIZ + `${quiz_slug}/`
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: "JWT " + localStorage.getItem("accessToken"),
      }
    }
      try {
        const response = await fetch(apiUrl, requestOptions);
        const jsonData = await response.json();
        setQuiz(jsonData);
        navigateTo("/dashboard");
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    }

  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <div className="text-black">
            <div className="w-full h-[6vh] bg-slate-700 flex items-center px-3 py-3">
              <h2 className="text-2xl text-green-300 font-[g-bold] tracking-wider">
                {quiz.title}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-8 px-3">
              {localStorage.getItem("role") === "Student" ? (
                <div
                  onClick={() =>
                    navigateTo(`/${subject_code}/${quiz_slug}/startquiz`)
                  }
                  className="flex flex-col justify-center items-center border-2 p-3 hover:bg-slate-700 hover:text-white rounded-xl"
                >
                  <div className="h-[70%] flex justify-center">
                    <img src={startbtn} alt="" />
                  </div>
                  <p className="text-xl font-[g-medium] mt-3">Start Quiz</p>
                </div>
              ) : null}

              {localStorage.getItem("role") !== "Student" && (
                <div
                  onClick={() =>
                    navigateTo(`/${subject_code}/${quiz_slug}/questions`)
                  }
                  className="hidden flex-col justify-center items-center border-2 p-3 hover:bg-slate-700 hover:text-white rounded-xl"
                >
                  <div className="h-[70%] flex justify-center">
                    <img src={quizIcon} alt="" />
                  </div>
                  <p className="text-xl font-[g-medium] mt-3">Questions</p>
                </div>
              )}
              <div
                onClick={() =>
                  navigateTo(`/${subject_code}/${quiz_slug}/result`)
                }
                className="flex flex-col justify-center items-center border-2 p-3 hover:bg-slate-700 hover:text-white rounded-xl"
              >
                <div className="h-[70%] flex justify-center">
                  <img src={resultIcon} alt="" />
                </div>
                <p className="text-xl font-[g-medium] mt-3">Result</p>
              </div>

              {localStorage.getItem("role") !== "Student" && (
                <div
                  onClick={() =>
                    navigateTo(`/${subject_code}/${quiz_slug}/edit`)
                  }
                  className=" hidden flex-col justify-center items-center border-2 p-3 rounded-xl hover:bg-slate-700 hover:text-white"
                >
                  <div className="h-[70%] flex justify-center">
                    <img src={editIcon} className="w-[75%]" alt="" />
                  </div>
                  <p className="text-xl font-[g-medium] mt-3">Edit Quiz</p>
                </div>
              )}

              {localStorage.getItem("role") !== "Student" && (
                <div className="flex flex-col justify-center items-center border-2 p-3 rounded-xl hover:bg-slate-700 hover:text-white">
                  <div className="h-[70%] flex justify-center">
                    <img
                      src={deletebtn}
                      className="w-[100%]"
                      alt=""
                      onClick={() => setShowDeleteConfirmation(true)}
                    />
                  </div>
                  <p className="text-xl font-[g-medium] mt-3">Delete</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Quiz
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this quiz? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

}

export default Quiz;
