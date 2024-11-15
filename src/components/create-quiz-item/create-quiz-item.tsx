import { useState } from "react";
import { IFillArray } from "../../features/quiz-template/types";
import { CreateQuestItem } from "../create-quest-item/create.quest-item";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addTextQuestion, answers, deleteCreateQuestion } from "../../features/quiz-template/tests.slice";

interface IProp {
    id: number;
    index: number;
    onDeleteQuizItem: (id: number) => void;
}

export const CreateQuizItem: React.FC<IProp> = ({ index, id, onDeleteQuizItem }) => {
    const [questionText, setQuestionText] = useState<string>("")
    const [trimError, setTrimError] = useState<string>('')
    const [lengthError, setLengthError] = useState<string>('')
    const [correctAnswerText, setCorrectAnswerText] = useState<string>("")
    const [arrayQuestion, setArrayQuestion] = useState<IFillArray[]>([])
    const [isSaved, setIsSaved] = useState<boolean>(false)
    const arrayAnswers = useAppSelector(answers)
    const dispatch = useAppDispatch()
    const temp = arrayAnswers.filter(arr => arr !== '')


    const handleFillArray = () => {
        setArrayQuestion([...arrayQuestion, { id: Date.now() }])
    }

    const handleDeleteQuestItem = (id: number) => {
        setArrayQuestion(arrayQuestion.filter((quest) => quest.id !== id));
    }

    const handleSaveQuestion = () => {
        if (questionText.trim() && correctAnswerText.trim()) {
            if (arrayQuestion.length < 2) {
                setLengthError('Any question must have at least two answers')
            } else {
                dispatch(
                    addTextQuestion({
                        id,
                        text: questionText,
                        correct: correctAnswerText,
                        options: temp
                    })
                )
                setIsSaved(true)
                setLengthError('')
            }
            setTrimError('')
        } else {
            setTrimError('Fill in all fields')
        }
    }

    return (
        <div
            className={`relative max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-5 border border-gray-200`}
        >
            <button
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 transition duration-300"
                title="Clear all questions"
                onClick={() => {
                    onDeleteQuizItem(id);
                    dispatch(deleteCreateQuestion(id));
                }}
            >
                ✕
            </button>

            <h2 className="text-xl font-semibold text-center text-gray-700">
                Question number {index}
            </h2>

            <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter question text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-400 text-gray-700"
            />

            <div className="space-y-3">
                {arrayQuestion.map((arr) => (
                    <CreateQuestItem
                        key={arr.id}
                        id={arr.id}
                        onDeleteQuestItem={handleDeleteQuestItem}
                        isSaved={isSaved}
                    />
                ))}
            </div>

            <div className="flex items-center gap-4 mt-4">
                {arrayQuestion.length > 0 && (
                    <input
                        type="text"
                        placeholder="Correct answer"
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 placeholder-gray-400 text-gray-700"
                        value={correctAnswerText}
                        onChange={(evt) => setCorrectAnswerText(evt.target.value)}
                    />
                )}
                <button
                    disabled={isSaved}
                    onClick={handleFillArray}
                    className={`flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-300 ${isSaved && 'opacity-50'}`}
                >
                    +
                </button>
            </div>

            <button
                disabled={isSaved}
                onClick={handleSaveQuestion}
                className={`mt-6 w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none transition duration-300 ${isSaved && 'opacity-50'}`}
            >
                Save
            </button>

            {trimError && <p style={{ color: 'red' }}>{trimError}</p>}
            {lengthError && <p style={{ color: 'red' }}>{lengthError}</p>}
        </div>
    );
};
