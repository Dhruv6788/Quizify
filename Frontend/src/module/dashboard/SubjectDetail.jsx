import React, { useState } from 'react';
import Navbar from '../base/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import quiz from '../../assets/quiz.svg';
import editbtn from '../../assets/editbtn.svg';
import result from '../../assets/result.svg';
import deletebtn from '../../assets/deletebtn.svg';
import details from '../../assets/details.svg';
import students from '../../assets/students.svg';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SubjectDetail = () => {

    const { subject_code } = useParams();
    const [subject, setSubject] = useState([]);
    const [isLoad, setisLoad] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigateTo = useNavigate();

    const deleteSubject = async () => {

        const deleteapiUrl = import.meta.env.VITE_DELETE_SUBJECT + `${subject_code}/`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('accessToken')
            }
        };

        try {
            const response = await fetch(deleteapiUrl, requestOptions);
            if (response.ok) {
                const jsonData = await response.json();
                console.log(jsonData);
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
        navigateTo('/dashboard');
    };

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_GET_SINGLE_SUBJECT_DETAILS + `${subject_code}/`;
        const requestParameters = {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('accessToken')
            }
        };

        const getSingleSubject = async () => {
            try {
                setisLoad(true);
                const response = await fetch(apiUrl, requestParameters);
                const jsonData = await response.json();
                console.log(jsonData);
                setSubject(jsonData);
                setisLoad(false);
            } catch (error) {
                console.error('Error fetching subjects:', error);
                setisLoad(false);
            }
        };

        getSingleSubject();
    }, []);

    const handleDeleteConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <div>
            <Navbar />
            {
                isLoad ?
                    <div className='w-screen h-[70vh] flex justify-center items-center'>
                        <CircularProgress color="inherit" />
                    </div>
                    :
                    <div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-[g-bold] text-green-600'>{subject.name}</h1>
                            <hr />
                        </div>

                        <div className='grid grid-cols-2 gap-10 mt-8 px-3'>
                            <div onClick={() => navigateTo(`/${subject_code}/quizdetail`)} className='flex flex-col justify-center items-center border-2 p-3 hover:bg-slate-700 hover:text-white rounded-xl'>
                                <div className='h-[70%] flex justify-center'>
                                    <img src={quiz} alt="" />
                                </div>
                                <p className='text-xl font-[g-medium]  mt-3'>Quiz</p>
                            </div>

                            <div onClick={() => navigateTo(`/${subject_code}/students`)} className='flex flex-col justify-center items-center border-2 p-3 rounded-xl hover:bg-slate-700 hover:text-white'>
                                <div className='h-[70%] flex justify-center'>
                                    <img src={students} className='' alt="" />
                                </div>
                                <div className='flex justify-center w-full'>
                                    <p className='text-xl font-[g-medium] mt-3'>Students</p>
                                </div>
                            </div>

                            {localStorage.getItem('role') !== 'Student' &&
                                <div onClick={() => navigateTo(`/${subject_code}/edit`)} className='flex flex-col justify-center items-center border-2 p-3 rounded-xl hover:bg-slate-700 hover:text-white'>
                                    <div className='h-[70%] flex justify-center'>
                                        <img src={editbtn} className='w-[75%]' alt="" />
                                    </div>
                                    <p className='text-xl font-[g-medium] mt-3'>Edit Subject</p>
                                </div>
                            }

                            {localStorage.getItem('role') !== 'Student' &&
                                <div className='flex flex-col justify-center items-center border-2 p-5 rounded-xl hover:bg-slate-700 hover:text-white'>
                                    <div className='h-[70%] flex justify-center'>
                                        <img src={deletebtn} className='w-[75%]' onClick={handleDeleteConfirmation} alt="" />
                                    </div>
                                    <p className='text-xl font-[g-medium] mt-3'>Delete</p>
                                </div>

                            }

                        </div>
                    </div>
            }
            
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="w-[90%] h-[50%] bg-white px-8 rounded-xl shadow-lg flex flex-col justify-center">
                        <p className="text-2xl font-bold mb-4 text-center">Are you sure you want to delete this subject?</p>
                        <div className="flex justify-center gap-10 mt-6">
                            <button onClick={deleteSubject} className="w-[40%] py-3 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                            <button onClick={handleCancelDelete} className="w-[40%] bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubjectDetail;
