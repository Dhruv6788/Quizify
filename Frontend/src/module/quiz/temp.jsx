import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../base/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSchema } from '../../schemas';

const EditQuiz = () => {
    const { subject_code, quiz_slug } = useParams();
    const [date, setDate] = useState();
    const [time, setTime] = useState('00:00');
    const [fileData, setFileData] = useState(null);
    const navigateTo = useNavigate();
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_GET_SINGLE_QUIZ + `${quiz_slug}/`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('accessToken')
            }
        };
        const getSingleQuiz = async () => {
            try {
                const response = await fetch(apiUrl, requestOptions);
                const jsonData = await response.json();
                setQuiz(jsonData);
                setDate(new Date(jsonData.starting_time));
                setTime(jsonData.starting_time.split('T')[1].substring(0, 5));
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        getSingleQuiz();
    }, [quiz_slug]);

    const formik = useFormik({
        initialValues: {
            title: quiz ? quiz.title : '',
            description: quiz ? quiz.description : '',
            duration: quiz ? quiz.duration : '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, action) => {
            const apiUrl = import.meta.env.VITE_CREATE_QUIZ;
            const startingTime = `${date}T${time}`;
            console.log(startingTime)
            console.log(localStorage.getItem('accessToken'))
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('quiz_file', fileData);
            formData.append('starting_time', startingTime);
            formData.append('duration', values.duration);
            formData.append('subject', subject_code);

            const requestParameters = {
                method: 'POST',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('accessToken')
                },
                body: formData
            };

            try {
                const response = await fetch(apiUrl, requestParameters);
                const jsonData = await response.json();
                console.log(jsonData);
                if (response.ok) {
                    navigateTo('/dashboard')
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
            action.resetForm()
        },
    });

    const handleDateChange = (selectedDate) => {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setDate(formattedDate);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleFileChange = (e) => {
        setFileData(e.target.files[0]);
    };

    return (
        <>
            <header>
                <Navbar />
            </header>
            <div className='w-full h-[6vh] bg-slate-700 flex items-center px-3 py-3'>
                <h2 className='text-2xl text-green-300 font-[g-bold] tracking-wider'>Edit Quiz</h2>
            </div>
            <div className='AddQuiz w-full'>
                <div className="form-container">
                    <form className='w-[93%] mx-auto mt-5 font-[g-regular]' onSubmit={formik.handleSubmit}>
                        <div>
                            <input
                                type="text"
                                className='w-full border rounded-md border-green-400 placeholder:text-xl text-xl py-2 px-2 outline-none'
                                placeholder='Quiz Name'
                                id='title'
                                name='title'
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {/* Validation errors */}
                        </div>

                        <div className='mt-4'>
                            <textarea
                                className='w-full border border-green-400 placeholder:text-xl text-xl py-1 px-2 outline-none rounded-md'
                                rows={3}
                                placeholder='Description'
                                id='description'
                                name='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {/* Validation errors */}
                        </div>

                        <div className='mt-1'>
                            <div className='flex gap-3'>
                                <div>
                                    <h3>Start Date</h3>
                                    <DatePicker
                                        selected={date ? new Date(date) : null}
                                        onChange={handleDateChange}
                                        required
                                        dateFormat="yyyy-MM-dd"
                                        className='border border-green-300 rounded-md outline-none px-2 py-2 bg-white text-lg placeholder:text-left placeholder:tracking-widest text-left'
                                    />
                                </div>
                                <div className='w-[50%]'>
                                    <h3>Start Time</h3>
                                    <input
                                        type="time"
                                        onChange={handleTimeChange}
                                        className='border border-green-300 rounded-md outline-none w-[100%] px-2 py-2 bg-white text-lg placeholder:text-left placeholder:tracking-widest text-left'
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-3">
                                <input
                                    type="text"
                                    className='w-full border border-green-400 placeholder:text-xl rounded-md text-xl py-2 px-2 outline-none'
                                    placeholder='Duration'
                                    id='duration'
                                    name='duration'
                                    value={formik.values.duration}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {/* Validation errors */}
                                <p className='text-sm text-gray-400 font-[g-medium] mt-1'>Specify quiz Duration in Minutes</p>
                            </div>

                            <div className='mt-4'>
                                <input
                                    type="file"
                                    name='file'
                                    id='file'
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-300 file:text-black hover:file:bg-green-200"
                                    onChange={handleFileChange}
                                />
                                <p className='text-sm text-gray-400 font-[g-medium] text-justify mt-2'>Please upload the Excel file containing the list of emails that will be added to the class.</p>
                            </div>
                        </div>
                        <button type="submit" className="mt-6 w-full py-3 bg-slate-700 rounded-lg text-green-300 text-lg">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditQuiz;
