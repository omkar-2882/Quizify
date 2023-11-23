import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quiz/quizSlice";
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        quiz: quizReducer,

    },
    middleware: [thunk],
})