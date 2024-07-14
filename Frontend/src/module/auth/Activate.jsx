import React from 'react'
import Submit from '../../components/Submit'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const Activate = () => {
    const [isLoad, setisLoad] = useState()
    const { uid, token } = useParams()
    const navigate = useNavigate()
    const handleClick = async () => {
        try {
            setisLoad(true)
            const response = await fetch(import.meta.env.VITE_ACCOUNT_ACTIVATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid: uid, token: token }),
            });

            if (!response.status == 204) {
                toast("Something Went Wrong !!")
            }
            else {
                toast(<p className='font-[g-black]'>Yeah, Account Activated Successfully!!</p>)
                navigate("/login")
            }
            setisLoad(false)
        } catch (error) {
            toast("Oops! An Error Occured")
        }
    }

    return (
        <div className='bg-[black]'>
            <ToastContainer />
            <Header/>
            <div className='flex justify-center mt-5'>
                <p className='font-[g-black] text-3xl text-[#99dd999d]'>Welcome to Quizify</p>
            </div>
            <div className='flex justify-center'>
                <div className='mt-5 px-4 py-3 lg:w-[20vw]'>
                    <Submit
                        title="Activate Account"
                        onclick={handleClick}
                        loading={isLoad}
                    />
                </div>
            </div>
        </div>
    )
}
export default Activate