import React, { useEffect, useState } from 'react';
import Navbar from '../base/Navbar';
import Subjects from '../../components/Subjects';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [subjects, setSubjects] = useState([]);
    const navigateTo = useNavigate()
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_GET_SUBJECT_DETAILS;
        const requestParameters = {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('accessToken')
            }
        };
        const getAllSubjects = async () => {
            try {
                const response = await fetch(apiUrl, requestParameters);
                const jsonData = await response.json();
                console.log(jsonData);
                setSubjects(jsonData);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        getAllSubjects();
    }, []);

    return (
        <>
            {localStorage.getItem('accessToken') ? <div>
                <div>
                    <Navbar />
                </div>
                <div className='w-full h-[6vh] bg-slate-700 flex items-center justify-between px-3 py-3'>
                    <h2 className='text-2xl text-green-300 font-[g-bold]'>Subjects</h2>
                    <button onClick={() => navigateTo('/newsubject')} className='bg-green-300 w-[35px] h-[35px] flex justify-center items-center rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="black"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                    </button>
                </div>
                <div className='mt-4'>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay={{
                            delay: 5000,
                        }}
                        className='mySwiper'
                    >
                        {subjects?.map((subject, index) => (
                            <SwiperSlide key={index}>
                                <Subjects
                                    title={subject.name}
                                    subjectCode={subject.subject_code}
                                    onClick={() => navigateTo(`/${subject.subject_code}`)}
                                    created_by={subject.teacher.email}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div> : navigateTo('/login')}
        </>
    );
};
export default Dashboard;
