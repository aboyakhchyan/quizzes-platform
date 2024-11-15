import { useEffect, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { addQuestionAnswer } from "../../features/quiz-template/tests.slice"

interface IProp {
    onDeleteQuestItem: (id: number) => void
    isSaved: boolean
    id: number
}

export const CreateQuestItem: React.FC<IProp> = ({onDeleteQuestItem, id, isSaved}) => {

    const [answerText, setAnswerText] = useState<string>('')
    const [isCompelete, setIsComplete] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if(evt.key === 'Enter') {
            dispatch(addQuestionAnswer(answerText))
            setIsComplete(true)
        }
    }
    


    return (
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <input 
                type="text"
                value={answerText}
                onChange={evt => setAnswerText(evt.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter answer option"
                className={`flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${isCompelete && 'bg-orange-300'}`}
            />
            <button 
                disabled={isSaved}
                className="text-gray-500 text-lg cursor-pointer hover:text-red-500 transition duration-300"
                onClick={() => onDeleteQuestItem(id)}
            >
                x
            </button>
        </div>
    )
}
