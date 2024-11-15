import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addUserTest, getQuestions, quests } from "../tests.slice";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionItem } from "../../../components/question-item/question-item";
import { IResultTest } from "../types";

export const PassQuiz = () => {
    const [data, setData] = useState<IResultTest | null>(null)
    const [error, setError] = useState<string>('')
    const { id } = useParams();
    const questions = useAppSelector(quests)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const name = sessionStorage.getItem('userName')

    useEffect(() => {
        if (id) {
            dispatch(getQuestions(id));
        }

    }, [id]);


    const handleCheckResult = () => {
        if(data?.answers[0].questions.length === questions.length) {
            dispatch(addUserTest(data))
            navigate(`/dashboard/quiz/result/${name}/${id}`)
            setError('')
        }else {
            setError('All questions must be answered')
        }
    } 
    

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Pass the Quiz</h2>
            <div className="space-y-4">
                {questions.map(quest => (
                    <QuestionItem 
                        key={quest.id} 
                        quest={quest}
                        onSetData={setData}
                        id={id}
                    />
                ))}
            </div>
            <button 
                onClick={() => handleCheckResult()}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md mt-8 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                Submit
            </button>
            {error && <p className="mt-4 text-red-600 font-semibold text-center p-3 bg-red-100 border border-red-400 rounded-lg">{error}</p>}
        </div>
    );
};
