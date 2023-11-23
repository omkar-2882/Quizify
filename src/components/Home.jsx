import React, { useEffect, useState } from 'react'
import "./Home.css"
import { QuestionBox } from './QuestionBox'
import { setQuestions } from '../features/quiz/quizSlice';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionChoice } from './QuestionChoice';
import { Result } from './Result';

export const Home = () => {

  const { finishQuiz, userResponses } = useSelector(state => state.quiz);

  return (
    <>
      <div className='homeContainer'>
        <QuestionChoice />
        {finishQuiz && userResponses.length>0 && <Result />}
      </div>
    </>
  )
}
