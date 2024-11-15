import { useAppDispatch } from "../../app/hooks"
import { deleteAnswerOption, editAnswerOption } from "../../features/quiz-template/tests.slice"

interface IProp {
    option: string
    questId: number | string
    index: number 
}

export const EditQuestItem: React.FC<IProp> = ({ option, questId, index }) => {

    const dispatch = useAppDispatch()

    return (
        <div className="flex items-center space-x-2 mb-2">
            <input 
                type="text"
                placeholder="Option"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                value={option}
                onChange={(evt) =>
                    dispatch(editAnswerOption({
                        questId: questId,
                        index: index,
                        newAnswer: evt.target.value
                    }))
                }
            />
            <button 
                className="p-2 text-black rounded-full hover:bg-red-600 transition-colors duration-200"
                onClick={() => 
                    dispatch(deleteAnswerOption({
                        questId: questId,
                        index: index
                    }))
                }
            >
                x
            </button>
        </div>
    )
}
