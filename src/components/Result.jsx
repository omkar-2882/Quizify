import React, { useEffect, useRef, useState } from 'react'
import "./Result.css"
import { useDispatch, useSelector } from 'react-redux'
import { clearQuiz } from '../features/quiz/quizSlice';
import { ResultBox } from './ResultBox'

export const Result = () => {
    const dispatch = useDispatch();

    const { userResponses } = useSelector(state => state.quiz);
    const [totalScore, settotalScore] = useState(0)

    const handleHomeBtn = () => {
        dispatch(clearQuiz())
    }

    useEffect(() => {
        let sum = 0;
        userResponses.forEach((userResponse) => {
            if (userResponse.isCorrect) {
                sum++;
            }
        });
        settotalScore(sum);
    }, [])

    return (
        <>
            <h1>Result Summary</h1>
            <div className='resultSummary'>
                <h2>Total Score: {totalScore}/{userResponses.length}</h2>
                <h2>Percentage: {Math.round((totalScore/userResponses.length)*100)}%</h2>
            </div>
            <button className='homebtn' onClick={handleHomeBtn}>Home</button>
            <div className='resultContainer'>
                {userResponses.map((userResponse) =>
                    <ResultBox key={userResponse.questionIndex} userResponse={userResponse} />
                )}
                {/* <ResultBox /> */}
            </div>
        </>
    )
}
