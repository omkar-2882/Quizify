import React, { useEffect, useRef, useState } from 'react'
import "./QuestionBox.css"
import { useDispatch, useSelector } from 'react-redux'
import { clearQuiz, decrementTimer, moveToNextQuestion, resetQuiz, setCurrentQuestion, setFinishQuiz, setOptions, setUserResponse } from '../features/quiz/quizSlice';
import he from 'he';

export const QuestionBox = () => {
    const optionRef = useRef(null);
    const optionListRef = useRef(null);
    const dispatch = useDispatch();
    const { questions, currentQuestionIndex, userResponses, currentQuestion, options } = useSelector(state => state.quiz);

    const [timeInterval, setTimeInterval] = useState(null);
    const [responded, setresponded] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const [seconds, setSeconds] = useState(10);

    const isCorrectOption = (option) => {
        // clearInterval(timeInterval);
        setSelectedOption(option);
        setresponded(false);
        const userRes = {
            questionIndex: currentQuestionIndex,
            question: currentQuestion,
            answer: questions[currentQuestionIndex].correct_answer,
            response: option,
            options: options,
            submissionTime: seconds
        }
        if (option === questions[currentQuestionIndex].correct_answer) {
            dispatch(setUserResponse({ ...userRes, correct: true }));
        }
        else {
            dispatch(setUserResponse({ ...userRes, correct: false }));
        }
    }

    const handleNextQuestion = () => {
        setSelectedOption(null)
        clearInterval(timeInterval);
        setSeconds(10);
        dispatch(moveToNextQuestion())
        setresponded(true);
    }
    const handleFinishQuiz = () => {
        clearInterval(timeInterval);
        dispatch(setFinishQuiz(true));
    }
    const handleResetQuestion = () => {
        setSeconds(10);
        dispatch(resetQuiz())
        setSelectedOption(null)
    }
    const handleHomeBtn = () => {
        dispatch(clearQuiz())
    }

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        setTimeInterval(interval);

        if (questions) {
            dispatch(setCurrentQuestion(he.decode(questions[currentQuestionIndex].question)))
            const options = [...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer];
            const sanitized_options = options.map(option => he.decode(option));
            dispatch(setOptions(sanitized_options));
        }
        return () => clearInterval(interval);
    }, [currentQuestionIndex])

    useEffect(() => {
        if (seconds === 0 && selectedOption === null) {
            clearInterval(timeInterval);
            const userRes = {
                questionIndex: currentQuestionIndex,
                question: currentQuestion,
                answer: questions[currentQuestionIndex].correct_answer,
                response: "",
                options: options,
                submissionTime: seconds
            }
            if (currentQuestionIndex === questions.length - 1) {
                dispatch(setUserResponse({ ...userRes, correct: false }));
                handleFinishQuiz();
            }
            else {
                dispatch(setUserResponse({ ...userRes, correct: false }));
                handleNextQuestion();
            }
        }
        else if (seconds === 0 && selectedOption !== null) {
            clearInterval(timeInterval);
            setSelectedOption(null);
            handleNextQuestion();
        }
    }, [seconds, selectedOption]);

    return (
        <>
            <button className='homebtn' onClick={handleHomeBtn}>Home</button>
            <div className='qroot '>
                <div className='qheader'>
                    <i className={"fa-solid fa-hourglass-end" + " " + (!selectedOption ? "fa-bounce" : "")}></i>
                    <h2>00:00:{seconds}</h2>
                </div>
                <div className='qbox'>
                    <div className='leftCont'>
                        <h2>Question No.  {currentQuestionIndex + 1}</h2>
                        <p>{currentQuestion}</p>
                    </div>
                    <div className='rightCont'>
                        <ul ref={optionListRef} className='options-list'>
                            {options.map(option =>
                                <li className={selectedOption == option ? "selected" : ""}
                                    id={option}
                                    key={option}

                                    onClick={() => { isCorrectOption(option) }}>{option}</li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className='qfooter'>
                    <button onClick={handleResetQuestion}>Reset</button>
                    {questions.length == currentQuestionIndex + 1 ?
                        <button disabled={!selectedOption} onClick={handleFinishQuiz}>Finish</button>
                        :
                        <button disabled={!selectedOption} onClick={handleNextQuestion}>Next</button>
                    }
                </div>
            </div>
        </>
    )
}
