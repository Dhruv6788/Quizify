import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';
import Navbar from '../base/Navbar';

const Profile = () => {
    const [User, setUser] = useState([])
    const [role, setRole] = useState()
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_GET_CURRENT_PROFILE;
        const requestParameters = {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('accessToken')
            },
        }
        const getUserDetails = async () => {
            const response = await fetch(apiUrl, requestParameters)
            const jsonData = await response.json()
            console.log(jsonData)
            setUser(jsonData)
            localStorage.setItem('role', jsonData.role)
            setRole(jsonData.role)
        }
        getUserDetails()
    }, [])

    return (
        <>
            <div>
                <Navbar />
                <div className='px-3'>
                    <div>{role}</div>
                </div>
            </div>
        </>
    )
}

export default Profile