import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
    userResponses: [],
    currentQuestionIndex: 0,
    currentQuestion: "",
    options: [],
    loading: false,
    finishQuiz: false,
    timer: 0,
    interval: null,
    categories: [
        {
            id: 9,
            name: 'General Knowledge'
        },
        {
            id: 10,
            name: 'Entertainment: Books'
        },
        {
            id: 11,
            name: 'Entertainment: Film'
        },
        {
            id: 12,
            name: 'Entertainment: Music'
        },
        {
            id: 13,
            name: 'Entertainment: Musicals & Theatres'
        },
        {
            id: 14,
            name: 'Entertainment: Television'
        },
        {
            id: 15,
            name: 'Entertainment: Video Games'
        },
        {
            id: 16,
            name: 'Entertainment: Board Games'
        },
        {
            id: 17,
            name: 'Science & Nature'
        },
        {
            id: 18,
            name: 'Science: Computers'
        },
        {
            id: 19,
            name: 'Science: Mathematics'
        },
        {
            id: 20,
            name: 'Mythology'
        },
        {
            id: 21,
            name: 'Sports'
        },
        {
            id: 22,
            name: 'Geography'
        },
        {
            id: 23,
            name: 'History'
        },
        {
            id: 24,
            name: 'Politics'
        },
        {
            id: 25,
            name: 'Art'
        },
        {
            id: 26,
            name: 'Celebrities'
        },
        {
            id: 27,
            name: 'Animals'
        },
        {
            id: 28,
            name: 'Vehicles'
        },
        {
            id: 29,
            name: 'Entertainment: Comics'
        },
        {
            id: 30,
            name: 'Science: Gadgets'
        },
        {
            id: 31,
            name: 'Entertainment: Japanese Anime & Manga'
        },
        {
            id: 32,
            name: 'Entertainment: Cartoon & Animations'
        }
    ],
}

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
            state.loading = false;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
            state.loading = false;
        },
        setUserResponse: (state, action) => {
            const { questionIndex, question, answer, response, correct, options, submissionTime } = action.payload;
            state.userResponses[action.payload.questionIndex] = { questionIndex: questionIndex, question: question, answer: answer, response: response, isCorrect: correct, options: options, submissionTime: submissionTime };
        },
        moveToNextQuestion: (state) => {
            state.currentQuestionIndex += 1;
        },
        resetQuiz: (state) => {
            state.userResponses = [];
            state.currentQuestionIndex = 0;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCurrentQuestion: (state, action) => {
            state.currentQuestion = action.payload;
        },
        setOptions: (state, action) => {
            const shuffleOptions = action.payload.sort(() => Math.random() - 0.5);
            state.options = [...shuffleOptions];
        },
        setFinishQuiz: (state, action) => {
            state.finishQuiz = action.payload;
        },
        clearQuiz: (state) => {
            state.questions = [];
            state.currentQuestionIndex = 0;
            state.userResponses = [];
            state.options = [];
            state.currentQuestion = "";
        },
    },
});

export const fetchQuestionsAsync = (formValues) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await fetch(
            `https://opentdb.com/api.php?amount=${formValues.amount}&category=${formValues.category}&difficulty=${formValues.difficulty}&type=${formValues.type}`
        );
        const jsondata = await response.json();
        const questions = jsondata.results;
        dispatch(setQuestions(questions));
    } catch (error) {
        console.error('Error fetching questions:', error);
    }

    dispatch(setLoading(false));
};

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await fetch(
            `https://opentdb.com/api_category.php`
        );
        const jsondata = await response.json();
        const categories_list = jsondata.trivia_categories;
        // console.log(categories_list);
        dispatch(setCategories(categories_list));
    } catch (error) {
        // Handle error if needed
        console.error('Error fetching Categories:', error);
    }

    dispatch(setLoading(false)); // set loading to false
};

export const {
    setQuestions,
    setUserResponse,
    moveToNextQuestion,
    resetQuiz,
    setLoading,
    setCurrentQuestion,
    setOptions,
    setCategories,
    setFinishQuiz,
    clearQuiz,
    startTimer,
    decrementTimer,
    stopTimer,
} = quizSlice.actions;

export default quizSlice.reducer;