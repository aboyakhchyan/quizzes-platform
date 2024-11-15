import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { EditQuizItem } from "../../../components/edit-quiz-item/edit-quiz-item"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { editNameQuiz, editSelectQuiz, getEditQuiz } from "../tests.slice"
import { useSaveEditQuizMutation } from "../quiz.api"

export const EditQuiz = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const editQuiz = useAppSelector(editSelectQuiz)
    const dispatch = useAppDispatch()
    const [saveEdit] = useSaveEditQuizMutation()
   
    useEffect(() => {
        if (id) {
            dispatch(getEditQuiz(id))
        }
    }, [id])

    console.log(editQuiz)

    return (
        <div className="bg-gray-100 p-8 rounded-xl shadow-lg max-w-2xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Quiz</h2>

            <div className="space-y-6">
                <input 
                    type="text"
                    placeholder="Quiz Name"
                    className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    value={editQuiz.name || ""}
                    onChange={(evt) => dispatch(editNameQuiz({ name: evt.target.value, quizId: id || '' }))}
                />

                <div className="space-y-4">
                    {editQuiz?.questions.map((item) => (
                        <EditQuizItem 
                            key={item.id}
                            id={item.id}
                            questions={editQuiz.questions}
                        />
                    ))}
                </div>

                <button
                    className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                    onClick={() => {
                        saveEdit(editQuiz)
                        navigate('/dashboard')
                    }}
                >
                    Save
                </button>

            </div>
        </div>
    )
}
