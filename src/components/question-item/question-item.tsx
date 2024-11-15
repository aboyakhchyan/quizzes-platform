import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IQuestion, IQuizies, IResultTest } from "../../features/quiz-template/types";
import { addQuestsResult, getQuiz, questResult, refreshQuestsResult, } from "../../features/quiz-template/tests.slice";

interface IProp {
    quest: IQuestion;
    onSetData: (data: IResultTest) => void;
    id: string | undefined;
}

export const QuestionItem: React.FC<IProp> = ({ quest, onSetData, id }) => {
    
    const [quiz, setQuiz] = useState<IQuizies | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const questsResult = useAppSelector(questResult)
    const dispatch = useAppDispatch()
    const name = sessionStorage.getItem('userName')

    useEffect(() => {
        if (name && quiz) {
            onSetData({
                userName: name,
                answers: [
                    {
                        quizName: quiz.name,
                        questions: questsResult
                    }
                ]
            });
        }
    }, [questsResult]);

    useEffect(() => {
        dispatch(refreshQuestsResult());
    }, [id]);


    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto my-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{quest.text}</h3>

            <ul className="space-y-2">
                {quest.options.map((item, index) => {
                    const isSelected = selectedAnswer === item; 
                    return (
                        <li 
                            key={index} 
                            className={`bg-blue-100 cursor-pointer rounded-md p-2 text-gray-700 font-medium ${isSelected ? 'bg-orange-400' : ''} ${selectedAnswer && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => {
                                if (selectedAnswer === item) {
                                    
                                    setSelectedAnswer(null);
                                    dispatch(addQuestsResult({
                                        id: quest.id, 
                                        questionText: quest.text,
                                        selectedAnswer: item,
                                        correctAnswer: quest.correct
                                    }));
                                } else if (!selectedAnswer) {
                                    
                                    setSelectedAnswer(item);
                                    if (id) {
                                        dispatch(getQuiz(id))
                                            .unwrap()
                                            .then(response => {
                                                setQuiz(response);
                                                dispatch(addQuestsResult({
                                                    id: quest.id, 
                                                    questionText: quest.text,
                                                    selectedAnswer: item,
                                                    correctAnswer: quest.correct
                                                }));
                                            });
                                    }
                                }
                            }}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
