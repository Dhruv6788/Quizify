import React from 'react'
import authUser from '../assets/AuthenticateUser.svg'
import RealTimeResult from '../assets/RealtimeResults.svg'
import filUpload from '../assets/fileUpload.svg'
import autoQuiz from '../assets/UserInterface.png'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)
const Features = () => {
    const features = [
        {
            image: authUser,
            headText: "Secure User Authentication",
            description: "Secure authentication system for both teachers and students to ensure authorized access. Your security is our top priority, and these features are designed to provide you with a secure and user-friendly experience throughout your interaction with the quiz application."
        },
        {
            image: filUpload,
            headText: "File Upload for Quiz Creation",
            description: "Effortlessly create quizzes by uploading a single .xlsx file. Our intuitive system parses your data, generating quizzes instantly. Simplify the quiz creation process for teachers, ensuring efficiency and convenience."
        },
        {
            image: autoQuiz,
            headText: "Automatic Quiz Generation",
            description: "Streamline quiz preparation with automatic creation. Upload a single .xlsx file, and our system intelligently generates quizzes based on the provided data, saving time and ensuring seamless quiz setup."
        },
        {
            image: RealTimeResult,
            headText: "Real-time Results",
            description: "Instantly view your quiz performance with real-time results. Receive immediate feedback, track progress, and gauge understanding effortlessly, providing an engaging and dynamic learning experience for both students and teachers."
        },

    ]

    return (
        <div>
            <div className="w-full px-3 font-[g-medium] mt-10">
                <div className="heading flex justify-center p-5 overflow-hidden">
                    <h1 className='text-5xl mt-10'>Features</h1>
                </div>

                <div className='mt-10 lg:flex lg:gap-10 lg:justify-start lg:flex-wrap lg:px-2'>
                    {features.map((item, index) => (
                        <div key={index} className={`cards-${index} mt-10 rounded-lg shadow-lg lg:w-[22vw] pb-10 border border-[black] bg-[#F0C47E]`}>
                            <div className="image h-[50%] py-5">
                                <img src={item.image} alt="" className='w-28 m-auto rounded-full border border-black bg-white' />
                            </div>
                            <div className="desc font-[g-black]">
                                <h1 className='text-center text-xl'>{item.headText}</h1>
                                <p className='text-justify px-6 font-[g-regular] text-sm mt-4 pb-5 text-wrap'>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Features