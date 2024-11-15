import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getQuestions, quests, results } from "../tests.slice";
import { ResultQuestionItem } from "../../../components/result-question-item/result-question-item";
import { useEffect, useState } from "react";

export const ResultPage = () => {
    const [numberCorrectAnswers, setNumberCorrectAnswers] = useState<number>(0);
    const questions = useAppSelector(quests);
    const dispatch = useAppDispatch();
    const { test } = useParams();
    const resultTest = useAppSelector(results);

    const temp = resultTest?.answers[0].questions;

    useEffect(() => {
        if (test) {
            dispatch(getQuestions(test));
        }

        let correctAnswers = 0;
        temp?.forEach(val => {
            if (val.correctAnswer === val.selectedAnswer) {
                correctAnswers++;
            }
        });
        setNumberCorrectAnswers(correctAnswers);
    }, [test, temp]);

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-8 relative">
            <div className="absolute top-4 right-4 bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-lg">
                <strong>Correct Answers: {numberCorrectAnswers}</strong>
            </div>
            

            <Link 
                to="/dashboard"
                className="inline-block text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-4"
            >
                Home page
            </Link>

            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Result Page</h3>

            <div className="space-y-4">
                {questions.map((quest, index) => {
                    return <ResultQuestionItem 
                        key={quest.id}
                        question={quest}
                        resultQuest={temp && temp[index]}
                    />
                })}
            </div>
        </div>
    );
};
