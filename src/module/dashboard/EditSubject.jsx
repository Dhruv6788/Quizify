import React, { useState, useEffect } from 'react';
import Navbar from '../base/Navbar';
import { useFormik } from 'formik';
import { createSubjectSchema } from '../../schemas';
import { useNavigate, useParams } from 'react-router-dom';

const EditSubject = () => {
    const { subject_code } = useParams();
    const [subject, setSubject] = useState({});
    const [file, setFile] = useState(null);
    const navigateTo = useNavigate()

    useEffect(() => {
        const getSingleSubject = async () => {
            const apiUrl = import.meta.env.VITE_GET_SINGLE_SUBJECT_DETAILS + `${subject_code}/`;
            const requestParameters = {
                method: 'GET',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('accessToken')
                }
            };
            try {
                const response = await fetch(apiUrl, requestParameters);
                const jsonData = await response.json();
                console.log(jsonData);
                setSubject(jsonData);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        getSingleSubject();
    }, [subject_code]);

    const { values, handleChange, handleBlur, handleSubmit, setValues } = useFormik({
        initialValues: {
            subject_name: '',
            subject_code: '',
        },
        validationSchema: createSubjectSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('subject_code', values.subject_code);
            formData.append('name', values.subject_name);
            const apiUrl = import.meta.env.VITE_UPDATE_SUBJECT + `${subject_code}/`;
            const requestOptions = {
                method: 'PATCH',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('accessToken')
                },
                body: formData,
            };
            try {
                const response = await fetch(apiUrl, requestOptions)
                const jsonData = await response.json()
                console.log(jsonData)
                navigateTo(`/${subject_code}`)
            } catch (error) {
                console.error("Something Went Wrong!!!")
            }
        }
    });

    useEffect(() => {
        setValues({
            subject_name: subject.name || '',
            subject_code: subject.subject_code || '',
        });
    }, [subject, setValues]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    return (
        <>
            <Navbar />
            <div className='w-full h-[6vh] bg-slate-700 flex items-center justify-between px-3 py-3'>
                <h2 className='text-2xl text-green-300 font-[g-bold]'>Edit Subject</h2>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit} className='w-[93%] mx-auto mt-10 font-[g-regular]'>
                    <div>
                        <input
                            type="text"
                            className='w-full border-b border-green-400 placeholder:text-xl text-xl py-2 outline-none'
                            placeholder='Subject Name'
                            id='subject_name'
                            name='subject_name'
                            value={values.subject_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className='mt-6'>
                        <input type="text"
                            className='w-full border-b border-green-400 placeholder:text-xl text-xl py-2 outline-none'
                            placeholder='Subject Code'
                            id='subject_code'
                            name='subject_code'
                            value={values.subject_code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className='mt-6'>
                        <input
                            type="file"
                            name='file'
                            id='file'
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-300 file:text-black hover:file:bg-green-200"
                            onChange={handleFileChange}
                        />
                        <p className='text-sm text-gray-400 font-[g-medium] text-justify mt-2'>Please upload the Excel file containing the list of emails that will be added to the class.</p>
                    </div>
                    <button type="submit" className="mt-6 w-full py-3 bg-slate-700 rounded-lg text-green-300 text-lg">Submit</button>
                </form>
            </div>
        </>
    );
};

export default EditSubject;