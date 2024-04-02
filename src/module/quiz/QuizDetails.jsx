import React, { useEffect, useState } from 'react';
import Navbar from '../base/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

const QuizDetails = () => {
    const navigateTo = useNavigate();
    const { subject_code } = useParams();
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        const getAllQuizDetails = async () => {
            const apiUrl = import.meta.env.VITE_GET_SUBJECT_QUIZ + `${subject_code}`;
            const requestParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + localStorage.getItem('accessToken')
                }
            };
            try {
                const response = await fetch(apiUrl, requestParameters);
                const jsonData = await response.json();
                console.log(jsonData);
                setQuiz(jsonData);
            } catch (error) {
                console.error("Something Went Wrong" + error);
            }
        };
        getAllQuizDetails();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };

    const formatTime = (timeString) => {
        const time = new Date(timeString);
        return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <div className='w-full h-[6vh] bg-slate-700 flex items-center justify-between px-3 py-3'>
                    <h2 className='text-2xl text-green-300 font-[g-bold]'>Quiz</h2>
                    <button onClick={() => navigateTo(`/${subject_code}/newquiz`)} className='bg-green-300 w-[35px] h-[35px] flex justify-center items-center rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="black"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                    </button>
                </div>

                <div>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay={{
                            delay: 5000,
                        }}
                        className='mySwiper'
                    >
                        {quiz.map((quizItem, index) => (
                            <SwiperSlide key={index}>
                                <div className='p-4 bg-slate-700 mx-4 mt-4 rounded-xl text-white'>
                                    <h3 className='text-2xl tracking-wider text-green-300 capitalize'>{quizItem.title}</h3>
                                    <p className='tracking-widest text-sm text-slate-300'>{subject_code}</p>
                                    <div className='mt-3'>
                                        <h4 className='text-sm text-slate-300 mt-1'>Start Time : {formatDate(quizItem.starting_time)} {formatTime(quizItem.starting_time)}</h4>
                                        <h4 className='text-sm text-slate-300 mt-1'>Duration : {quizItem.duration} minutes</h4>
                                        <h4 className='text-sm text-slate-300 mt-1'>Total Marks : {quizItem.total_marks}</h4>
                                        <h4 className='text-sm text-slate-300 mt-1'>{quizItem.status}</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
        </>
    );
};

export default QuizDetails;
