import axios from "axios";
import { createAppSlice } from "../../app/createAppSlice";
import { ICreateQuizies, IDeleteOption, IEditOption, IEditQuest, IEditQuiz, IQuestion, IQuizies, IResultQuest, IResultTest, IState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: IState = {
    questions: [],
    resultTest: null,
    questsResult: [],
    createQuiz: {
        name: '',
        questions: []
    },
    arrayAnswers: [],
    editQuiz: {
        id: '',
        name: '',
        questions: []
    }
}

export const testsSlice = createAppSlice({
    name: 'tests',
    initialState,
    reducers: create => ({
        getUserName: create.asyncThunk(
            async (name: string) => {
                const response = await axios.get(`http://localhost:3004/results?userName=${name}`)

                return response.data
            }
        ),
        getQuestions: create.asyncThunk(
            async (id: string) => {
                const response = await axios.get(`http://localhost:3004/tests?id=${id}`)

                return response.data[0].questions
            },
            {
                fulfilled: (state, action: PayloadAction<IQuestion[]>) => {
                    state.questions = action.payload
                }
            }
        ),
        getQuiz: create.asyncThunk(
            async (id: string) => {
                const response = await axios.get(`http://localhost:3004/tests?id=${id}`)

                return response.data[0]
            }
        ),
        addQuestsResult: create.reducer(
            (state, action: PayloadAction<IResultQuest>) => {
                const index = state.questsResult.findIndex(quset => quset.selectedAnswer == action.payload.selectedAnswer)
                const check = state.questsResult.find(quest => quest.id == action.payload.id)

                if(index === -1) {
                    if(!check) {
                        state.questsResult.push(action.payload)
                    }
                }else {
                    state.questsResult.splice(index, 1)
                }
            }
        ),
        refreshQuestsResult: create.reducer(
            (state) => {
                state.questsResult = []
            }
        ),
        addUserTest: create.asyncThunk(
            async (data: IResultTest | null) => {
                const response = await axios.post(`http://localhost:3004/results`, data)

                return response.data
            },
            {
                fulfilled: (state, action: PayloadAction<IResultTest>) => {
                    state.resultTest = action.payload
                }
            }
        ),
        addNameCreateQuiz: create.reducer(
            (state, action: PayloadAction<string>) => {
                    state.createQuiz.name = action.payload
            }
        ),
        addTextQuestion: create.reducer(
            (state, action: PayloadAction<IQuestion>) => {
                let temp = state.createQuiz.questions.find(item => item.id == action.payload.id)

                if(!temp) {
                    state.createQuiz.questions.push(action.payload)
                }
            }
        ),
        deleteCreateQuestion: create.reducer(
            (state, action: PayloadAction<number>) => {
                state.createQuiz.questions = state.createQuiz.questions.filter(item => item.id != action.payload)
            }
        ),
        addQuestionAnswer: create.reducer(
            (state, action: PayloadAction<string>) => {
                state.arrayAnswers.push(action.payload)
            } 
        ),
        refreshAnwsers: create.reducer(
            (state) => {
                state.arrayAnswers = []
            }
        ),
        pushNewQuiz: create.asyncThunk(
            async (data: ICreateQuizies) => {
                if(data.questions.length !== 0) {
                    const response = await axios.post(`http://localhost:3004/tests`, data)

                    return response.data
                }

                return []
            }
        ),
        getEditQuiz: create.asyncThunk(
            async (id: string) => {
                const response = await axios.get(`http://localhost:3004/tests?id=${id}`)

                return response.data
            },
            {
                fulfilled: (state, action: PayloadAction<IQuizies[]>) => {
                    state.editQuiz = action.payload[0]
                }
            }
        ),
        editNameQuiz: create.reducer(
            (state, action: PayloadAction<IEditQuiz>) => {
                state.editQuiz.name = action.payload.name
                state.editQuiz.id = action.payload.quizId
            }
        ),
        editTextQestion: create.reducer(
            (state, action: PayloadAction<IEditQuest>) => {
                state.editQuiz.questions.map(quest => {
                    if(quest.id == action.payload.questId) {
                        quest.text = action.payload.text
                    }
                })
            }
        ),
        deleteEditQuest: create.reducer(
            (state, action: PayloadAction<number | string>) => {
                state.editQuiz.questions = state.editQuiz.questions.filter(quest => quest.id !== action.payload)
            }
        ),
        editAnswerOption: create.reducer(
            (state, action: PayloadAction<IEditOption>) => {
                const question = state.editQuiz.questions.find(quest => quest.id == action.payload.questId)

                if(question) {
                    question.options[action.payload.index] = action.payload.newAnswer
                }
            }
        ),
        deleteAnswerOption: create.reducer(
            (state, action: PayloadAction<IDeleteOption>) => {
                const question = state.editQuiz.questions.find(quest => quest.id == action.payload.questId)

                if(question) {
                   question.options = question?.options.filter((_, index) => index != action.payload.index)
                }
            }
        )
    }),
    selectors: {
        quests: state => state.questions,
        questResult: state => state.questsResult,
        results: state => state.resultTest,
        createQuiz: state => state.createQuiz,
        answers: state => state.arrayAnswers,
        editSelectQuiz: state => state.editQuiz
    }
})


export const {getUserName,
              getQuestions,
              getQuiz,
              addUserTest,
              addQuestsResult,
              refreshQuestsResult,
              addNameCreateQuiz,
              addTextQuestion,
              deleteCreateQuestion,
              addQuestionAnswer,
              refreshAnwsers,
              pushNewQuiz,
              getEditQuiz,
              editNameQuiz,
              editTextQestion,
              deleteEditQuest,
              editAnswerOption,
              deleteAnswerOption} = testsSlice.actions

export const {quests, questResult, results, createQuiz, answers, editSelectQuiz} = testsSlice.selectors