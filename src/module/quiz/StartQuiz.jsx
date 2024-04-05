import React, { useState, useEffect } from 'react';
import Navbar from '../base/Navbar';
import { useParams } from 'react-router-dom';

const StartQuiz = () => {
    const [quizData, setQuizData] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { subject_code, quiz_slug } = useParams();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_GET_SINGLE_QUIZ + `${quiz_slug}/`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('accessToken')
            }
        };

        const getSingleQuiz = async () => {
            try {
                const response = await fetch(apiUrl, requestOptions);
                const jsonData = await response.json();
                setQuizData(jsonData);
                const savedAnswers = localStorage.getItem('selectedAnswers');
                if (savedAnswers) {
                    setSelectedAnswers(JSON.parse(savedAnswers));
                }
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        getSingleQuiz();
    }, []);

    const handleAnswerSelect = (questionId, choiceId) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [questionId]: choiceId
        }));
        localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
    };

    const handleSubmitQuiz = (event) => {
        event.preventDefault();
        setSubmitted(true);
        localStorage.removeItem('selectedAnswers');
    };

    if (!quizData) {
        return <div className="text-center">Loading quiz...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <div className='w-full h-[6vh] bg-slate-700 flex items-center px-3 py-3'>
                    <h2 className='text-2xl text-green-300 font-[g-bold] tracking-wider'>{quizData.title}</h2>
                </div>
                <div className='py-3 px-2 bg-slate-700 mt-3 mb-3'>
                    <h2 className='text-2xl font-[g-bold] text-center text-green-300'>Quiz Description</h2>
                    <h3 className='text-lg mt-3 text-white'>{quizData.description}</h3>
                </div>

                <div className='mx-2'>
                    <form onSubmit={handleSubmitQuiz}>
                        {quizData.questions.map(question => (
                            <div key={question.id} className="mb-6 rounded-xl p-4 border-2 bg-slate-700">
                                <h3 className="text-md text-justify tracking-wide mb-2 text-green-300">{question.text}</h3>
                                <ul className="list-disc ml-2">
                                    {question.choices.map((choice, index) => (
                                        <li key={choice.id} className="mb-2 list-none">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`question_${question.id}`}
                                                    value={choice.id}
                                                    onChange={() => handleAnswerSelect(question.id, choice.id)}
                                                    checked={selectedAnswers[question.id] === choice.id}
                                                    className="form-radio h-5 w-5"
                                                />
                                                <span className="ml-2 text-white">{choice.text}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {!submitted && (
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Submit Quiz
                            </button>
                        )}
                    </form>
                    {submitted && <p className="mt-4 text-green-600">Quiz submitted successfully!</p>}
                </div>


            </div>
        </>
    );
};

export default StartQuiz;
