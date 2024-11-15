import { useEffect, useState } from "react"
import { CreateQuizItem } from "../../../components/create-quiz-item/create-quiz-item"
import { IFillArray } from "../types"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { addNameCreateQuiz, createQuiz, pushNewQuiz, refreshAnwsers } from "../tests.slice"
import { useNavigate } from "react-router-dom"

export const CreateQuiz = () => {
    const [quizText, setQuizText] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [arrayQuestions, setArrayQuestions] = useState<IFillArray[]>([])
    const dispatch = useAppDispatch()
    const newQuiz = useAppSelector(createQuiz)
    const navigate = useNavigate()

    const handleFillArray = () => {
        setArrayQuestions([...arrayQuestions, { id: Date.now() }])
        dispatch(refreshAnwsers())
    }

    const handleDeleteQuizItem = (id: number) => {
        setArrayQuestions(arrayQuestions.filter(quest => quest.id !== id))
    }

    const handlePushNewQuiz = () => {
        dispatch(pushNewQuiz(newQuiz))
        .unwrap()
        .then(response => {
            if(Array.isArray(response) && response.length == 0) {
                setError('There must be at least one question')
            }else {
                navigate('/dashboard')
                setError('')
            }
        })
    }

    useEffect(() => {
        dispatch(addNameCreateQuiz(quizText))
    }, [quizText])


    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-8">
            <div className="max-w-lg w-full mx-auto"> 
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Create Quiz</h2>

                <input
                    type="text"
                    value={quizText}
                    onChange={(evt) => setQuizText(evt.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Enter quiz title"
                />

                <div className="space-y-4 mb-4">
                    {arrayQuestions.map((arr, index) => {
                       return <CreateQuizItem 
                                key={arr.id} 
                                index={index + 1}
                                id={arr.id}
                                onDeleteQuizItem={handleDeleteQuizItem}
                        />
                    })}
                </div>

                <button
                    onClick={handleFillArray}
                    className="w-12 h-12 text-2xl font-bold text-white bg-indigo-500 rounded-full shadow-lg hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 mx-auto block"
                >
                    +
                </button>
            </div>
            <button
                className="w-full p-3 mt-6 text-lg font-semibold text-white bg-indigo-500 rounded-lg shadow-lg hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onClick={handlePushNewQuiz}
            >
             Create
            </button>
            {error && <p className="mt-4 text-red-600 font-semibold text-center p-3 bg-red-100 border border-red-400 rounded-lg">{error}</p>}
        </div>
    )
}
