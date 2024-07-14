import React from 'react'
const Subjects = ({ title, subjectCode, onClick, subject, created_by, onDelete }) => {

  return (
    <div className='subject mx-auto w-[93vw] h-[24vh] lg:h-[30vh] bg-slate-700 rounded-md' onClick={onClick}>
      <div className='flex items-center'>
        <h1 className='text-green-300 text-2xl font-[g-bold] px-3 pt-3'>{title}</h1>
      </div>

      {!subject ? <div className='text-black px-3'>
        <h3 className='font-[g-medium] text-gray-400 mt-1'>Subject Code : {subjectCode}</h3>
        <div className='mt-4 text-lg'>
          <p className=' text-green-300'>1 Live</p>
          <p className=' text-gray-300 mt-2'>1 Pending</p>
          <div className='flex items-center mt-2'>
            <p className=' text-gray-300 mt-2 opacity-80 text-sm'>By {created_by}</p>
          </div>
        </div>
      </div> : null
      }
    </div>
  )
}

export default Subjects