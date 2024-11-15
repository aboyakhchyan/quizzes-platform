import { ChangeEvent } from "react"
import { ICreateQuizies, IQuestion } from "../../features/quiz-template/types"
import { useAppDispatch } from "../../app/hooks"
import { deleteEditQuest, editTextQestion } from "../../features/quiz-template/tests.slice"
import { EditQuestItem } from "../edit-quest-item/edit-quest.item"

interface IProp {
    questions: IQuestion[]
    id: number | string
}

export const EditQuizItem: React.FC<IProp> = ({ questions, id }) => {

    const dispatch = useAppDispatch()
    const question = questions.find(quest => quest.id == id)
    
    return (
        <div className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
                <button 
                    className="mr-2 p-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200"
                    onClick={() => dispatch(deleteEditQuest(id))}
                >
                    x
                </button>
                <input 
                    type="text"
                    placeholder="Question text"
                    className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow duration-200"
                    value={question?.text || ""}
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => 
                        dispatch(editTextQestion({ questId: id, text: evt.target.value }))
                    }
                />
            </div>

            <div className="space-y-2">
                {question?.options.map((option, index) => (
                    <EditQuestItem 
                        key={index}
                        option={option}
                        questId={id}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}
