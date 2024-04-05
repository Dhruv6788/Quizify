import React from 'react'
import Navbar from '../base/Navbar'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Students = () => {
    const { subject_code } = useParams()
    const [students, setStudents] = useState([])
    const [Subject, setSubject] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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
                setIsLoading(true)
                const response = await fetch(apiUrl, requestParameters);
                const jsonData = await response.json();
                console.log(jsonData.students);
                setSubject(jsonData)
                setStudents(jsonData.students)
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching subjects:', error);
                setIsLoading(false)
            }
        };
        getSingleSubject();
    }, [subject_code]);

    return (
        <>

            <div>
                <Navbar />
                <div>
                    <div className='w-full h-[6vh] bg-slate-700 flex items-center justify-between px-3 py-3'>
                        <h2 className='text-2xl text-green-300 font-[g-bold]'>Students</h2>
                        {/* <button  className='bg-green-300 w-[35px] h-[35px] flex justify-center items-center rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="black"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                    </button> */}
                    </div>
                    <div className=' w-full h-[6vh] bg-green-100 flex px-2 font-[g-bold]'>
                        <div className='w-[10%] flex justify-center items-center h-full tracking-wider text-lg'>No.</div>
                        <div className='w-[50%] h-full flex items-center text-lg'>
                            <p className='ml-5 tracking-wider'>Emails</p>
                        </div>
                        {/* <div className='w-[25%] flex justify-start items-center text-lg'>
                        <p>Status</p>
                    </div> */}
                        {/* <div className='w-[40%] h-full flex justify-center items-center text-lg'>
                        <p className='tracking-wider'>Remove</p>
                    </div> */}
                    </div>
                    {
                        isLoading ? <div>Loading...</div> :
                            students.map((student, index) => (
                                <div key={index} className='px-2'>
                                    <div className={`w-full h-[6vh] flex items-center border-b border-[#00000034]`}>
                                        <div className='w-[10%] flex justify-center items-center h-full'>{++index}</div>
                                        <div className='w-[50%] h-full flex justify-center items-center font-[g-regular] truncate ...'>{student.email}</div>
                                        {/* <div className='w-[25%] flex justify-start items-center text-lg'>
                                        <div className='w-[10px] h-[10px] bg-green-400 rounded-full ml-6'></div>
                                    </div> */}
                                        {/* <div className='w-[40%] h-full flex justify-center items-center text-lg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
                                    </div> */}
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>
        </>
    )
}

export default Students
