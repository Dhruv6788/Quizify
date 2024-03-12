import React from 'react'
import Navbar from './Navbar'
import ProfilePic from '../assets/ProfilePic.svg'
const Profile = () => {
  return (
    <div className='font-[g-regular] text-[#ffffffbe]'>
      <Navbar />
      <div className='bg-black'>
        <div className='flex justify-center'>
          <div className='profile-section relative w-[35vw] h-[35vw] flex items-center rounded-full shadow-sm shadow-white mt-5'>
            <img src={ProfilePic} className="object-contain w-[100%] h-[100%]" alt="" />
            <div className='w-[10vw] h-[10vw] bg-[black] absolute bottom-0 right-0 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" className='w-[100%] h-[100%]' viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center mt-5'>
          <h1 className='font-[g-bold] text-3xl tracking-wider'>Dhruv Joshi</h1>
          <p className='tracking-widest w-[70vw] text-center text-md'>Aspiring IT Engineering Student</p>
        </div>
      </div>
    </div>
  )
}

export default Profile