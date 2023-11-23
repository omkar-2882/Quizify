import React, { useEffect, useRef, useState } from 'react'
import "./QuestionBox.css"
import { useDispatch, useSelector } from 'react-redux'

export const ResultBox = (userResponse) => {

    const { questionIndex, question, answer, response, isCorrect, options, submissionTime } = userResponse.userResponse;
    // const dispatch = useDispatch();
    // const { questions, currentQuestionIndex, userResponses, currentQuestion } = useSelector(state => state.quiz);
    // const [correctOption, setCorrectOption] = useState("");

    // useEffect(() => {
    //     console.log(options)
    // }, [])

    return (
        <>
            <div className='qroot'>
                <div className={(isCorrect?"correctBackground":"wrongBackground") + " " + ("qheader")}>
                    {response==="" ? 
                    <h2>Not Attempted</h2>
                    :
                    <h2>Submitted In: {submissionTime} seconds</h2>
                }
                </div>
                <div className='qbox'>
                    <div className='leftCont'>
                        <h2>Question No. {questionIndex + 1}</h2>
                        <p>{question}</p>
                    </div>
                    <div className='rightCont'>
                        <ul className='options-list'>
                            {options.map((option) =>
                            (<li className={(answer === option ? "correctClass" : "") + " " + (response==option && !isCorrect?"wrongClass": "")
                            }
                                id={option}
                                key={option}
                            >{option}</li>)
                            )}
                        </ul>
                    </div>
                </div>
                <div className='rfooter'>
                    <p><span>{isCorrect ? 1 : 0}</span> Point</p>
                </div>
            </div>
        </>
    )
}
