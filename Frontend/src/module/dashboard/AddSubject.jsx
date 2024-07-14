import React, { useState } from 'react'
import Navbar from '../base/Navbar'
import { useFormik } from 'formik'
import { createSubjectSchema } from '../../schemas'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const initialValues = {
  subject_name: "",
  subject_code: "",
  file: null
};

const AddSubject = () => {
  const navigateTo = useNavigate()
  const [file, setFile] = useState(null);
  const { values, handleChange, handleBlur, handleSubmit, resetForm, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: createSubjectSchema,
    onSubmit: async (values, action) => {
      console.log(values)
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subject_code', values.subject_code);
      formData.append('name', values.subject_name);
      const apiUrl = import.meta.env.VITE_CREATE_SUBJECT;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('accessToken')
        },
        body: formData,
      };
      try {
        const response = await fetch(apiUrl, requestOptions)
        const jsonData = await response.json()
        console.log(jsonData)
        toast.success(<p>{values.name} Created Successfully!!!</p>)
        setTimeout(() => {
          navigateTo('/dashboard')
        }, 1000)
      } catch (error) {
        console.error("Something Went Wrong!!!")
        toast.success(<p>Something Went Wrong !!!</p>)
      }
    }
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    setFieldValue('file', selectedFile)
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className='w-full h-[6vh] bg-slate-700 flex items-center justify-between px-3 py-3'>
        <h2 className='text-2xl text-green-300 font-[g-bold]'>New Subject</h2>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className='w-[93%] mx-auto mt-10 font-[g-regular]'>
          <div>
            <input
              type="text"
              className='w-full border border-green-400 placeholder:text-xl text-xl py-2 px-2 rounded-md outline-none'
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
              className='w-full border border-green-400 placeholder:text-xl text-xl py-2 px-2 rounded-md outline-none'
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

export default AddSubject;
