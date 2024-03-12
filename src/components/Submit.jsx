import React from 'react'
import { CircularProgress } from '@mui/material'

const Submit = ({ loading, title, onclick }) => {
    return (
        <div>
            <button
                type="submit"
                disabled={loading ? true : false}
                className='w-full font-[g-medium] flex justify-center bg-[#8be78b81] tracking-wide capitalize mt-5 py-3 px-10 rounded text-[#ffffff83] cursor-pointer hover:bg-[#8fd08fa6]'
                onClick={onclick}
            >
                {loading ? <CircularProgress color="inherit" /> : title}
            </button>
        </div>
    )
}

export default Submit