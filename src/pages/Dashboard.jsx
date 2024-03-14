import { Input } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Submit from '../components/Submit'

const Dashboard = () => {
    let navLinks = [{
        link: "/dashboard",
        svgIcon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19ZM8 15H16V17H8V15Z"></path></svg>,
        name: "Home"
    },
    {
        link: "/dashboard",
        svgIcon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="27" height="27" fill="currentColor"><path d="M14 21C13.4477 21 13 20.5523 13 20V12C13 11.4477 13.4477 11 14 11H20C20.5523 11 21 11.4477 21 12V20C21 20.5523 20.5523 21 20 21H14ZM4 13C3.44772 13 3 12.5523 3 12V4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V12C11 12.5523 10.5523 13 10 13H4ZM9 11V5H5V11H9ZM4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15H10C10.5523 15 11 15.4477 11 16V20C11 20.5523 10.5523 21 10 21H4ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V4ZM15 5V7H19V5H15Z"></path></svg>,
        name: "Dashboard"
    },
    {
        link: "/profile",
        svgIcon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21.0082 3C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM20 5H4V19H20V5ZM18 15V17H6V15H18ZM12 7V13H6V7H12ZM18 11V13H14V11H18ZM10 9H8V11H10V9ZM18 7V9H14V7H18Z"></path></svg>,
        name: "Profile"
    },
    ];

    return (
        <div className='w-full h-screen font-[g-bold]'>
            <div className='h-full bg-gray-50 lg:flex'>
                <nav className='h-full w-[17vw] bg-purple-500'>
                    <header className='flex justify-center py-8 hover:bg-[#9843e8]'>
                        <h1 className='text-4xl text-[#ffffff]'>Quizify</h1>
                    </header>
                    <div className='w-full flex items-center text-white font-[g-regular] flex-col space-y-5 py-10'>
                        {
                            navLinks.map((item, index) => (
                                <div className='w-full  h-[7vh] flex items-center gap-3 hover:bg-[#9843e8] cursor-pointer'>
                                    <div className='w-[35%] h-full flex justify-center items-center'>
                                        {item.svgIcon}
                                    </div>
                                    <Link to={item.link} className='text-xl tracking-wider'>{item.name}</Link>
                                </div>
                            ))
                        }
                    </div>
                </nav>
                <section className='text-black w-[87vw]'>
                    <div className='w-full pl-5 py-4 bg-gray-200 flex justify-between'>
                        <h1 className='text-3xl font-[g-bold] text-purple-500 tracking-wide'>Namaste, Dhruv 👋</h1>
                        <div className='pr-5 flex gap-4 items-center'>
                            <Input placeholder='Search here' />
                            <div className='w-[1px] h-[80%] bg-gray-400'></div>
                            <div className='profile flex items-center gap-2'>
                                <div className='rounded-full w-[30px] h-[30px] bg-black'></div>
                                <h1>Dhruv Joshi</h1>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center mt-3'>
                        <h1 className='text-3xl px-5 font-[g-regular]'>Subject List</h1>
                        <div className='mr-5'>
                            <Submit title="Add Subject" bgColor="purple-500" color="white" />
                        </div>
                    </div>
                    <div className='subject-list py-5 pl-5 flex gap-5 flex-wrap justify-center items-center'>
                        <div className='w-[20vw] h-[12vw] bg-[#f4f4f4] border border-purple-100 shadow-lg rounded-xl'>
                            <div className='flex justify-between items-center px-3'>
                                <h1 className='text-center mt-2'>Advanced Web Development</h1>
                                <div className='mt-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path></svg>
                                </div>
                            </div>
                            <p className=' text-gray-300 font-[g-light] text-center'>Created at : 02/03/2023</p>
                            <div className='flex items-center'>
                                <div className='w-[3px] h-[70px] bg-purple-500 ml-4 mt-6'></div>
                                <div>
                                    <div className='px-3 font-[g-bold] mt-6 text-black'>Total Quiz : 05</div>
                                    <div className='px-3 font-[g-medium] text-[green]'>Active: 02</div>
                                    <div className='px-3 font-[g-medium] text-gray-500'>Pending: 02</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
}

export default Dashboard;
