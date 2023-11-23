import React, { useEffect, useState } from 'react'
import './QuestionChoice.css'
import { QuestionBox } from './QuestionBox'
import { fetchCategoriesAsync, fetchQuestionsAsync, setCategories, setCurrentQuestion, setQuestions } from '../features/quiz/quizSlice';
import { useDispatch, useSelector } from 'react-redux';

export const QuestionChoice = () => {
    const dispatch = useDispatch();

    const { loading, questions, categories, finishQuiz } = useSelector((state) => state.quiz);
    const [formValues, setFormValues] = useState({
        amount: 5,
        category: 9,
        difficulty: 'easy',
        type: 'multiple',
    });

    const handleFetchQuestions = () => {
        dispatch(fetchQuestionsAsync(formValues));
        console.log(formValues);
    };

    useEffect(() => {
        // dispatch(fetchCategoriesAsync())
    }, [])

    return (
        <>
            {!loading && questions.length === 0 &&
                <form className='qform' action="">
                    <div className='form-section'>
                        <p>Enter No. of Questions:</p>
                        <input type="number" value={formValues.amount} onChange={(e) => { setFormValues({ ...formValues, amount: e.target.value }) }} />
                    </div>
                    <div className='form-section'>
                        <p>Enter Category id:</p>
                        <select name="category" id="category"
                            onChange={e => { setFormValues({ ...formValues, category: e.target.value }) }}>
                            {categories.map(cat =>
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            )}
                        </select>
                    </div>
                    <div className='form-section'>
                        <p>Enter difficulty:</p>
                        <select name="difficulty" id="difficulty"
                            onChange={e => { setFormValues({ ...formValues, difficulty: e.target.value }) }}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className='form-section'>
                        <p>Enter type of Questions:</p>
                        <select name="type" id="type"
                            onChange={e => { setFormValues({ ...formValues, type: e.target.value }) }}>
                            <option value="multiple">MCQ</option>
                            <option value="boolean">True / False</option>
                        </select>
                    </div>

                    <button type='button' onClick={handleFetchQuestions}>Start The Quiz</button>
                </form>
            }
            {loading && <h1>Loading...</h1>}
            {questions.length > 0 && !finishQuiz && <QuestionBox />}
        </>
    )
}
