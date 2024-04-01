import React from 'react'
import { CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <div className='h-[80vh] flex justify-center items-center'>
        <CircularProgress color="secondary" />
    </div>
  )
}

export default Loader