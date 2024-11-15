export interface IQuizies {
    id: number | string
    name: string
    questions: IQuestion[]
}

export type ICreateQuizies = Omit<IQuizies, 'id'>

export interface IQuestion {
    id: number | string
    text: string
    options: string[]
    correct: string
}

export interface IState {
    questions: IQuestion[]
    resultTest: IResultTest | null
    questsResult: IResultQuest[]
    createQuiz: ICreateQuizies 
    arrayAnswers: string[]
    editQuiz: IQuizies
}


export interface IChange {
    item: string
    id: number | string
}

export interface IResultTest {
    userName: string
    answers: IAnswers[]
}

export interface IAnswers {
    quizName: string
    questions: IResultQuest[]
}

export interface IResultQuest {
    id: string | number
    questionText: string
    selectedAnswer: string
    correctAnswer: string
}

export interface IFillArray {
    id: number
}

export interface IResultQuiz extends IResultTest {
    id: string
}

export interface IEditQuiz {
    quizId: string | number
    name: string
}

export interface IEditQuest {
    questId: number | string
    text: string
}

export interface IEditOption {
    questId: number | string
    index: number
    newAnswer: string
}

export type IDeleteOption = Omit<IEditOption, 'newAnswer'>