import { useAppSelector } from "../../app/hooks";
import { IQuestion, IResultQuest, IResultTest } from "../../features/quiz-template/types";
import { results } from "../../features/quiz-template/tests.slice";

interface IProp {
    question: IQuestion
    resultQuest: IResultQuest | undefined
}

export const ResultQuestionItem: React.FC<IProp> = ({ question, resultQuest }) => {
    
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{question.text}</h3>

            <ul className="space-y-2">
                {question.options.map((opt, index) => {
                    console.log(opt)
                   return <li
                        key={index}
                        className={`bg-white p-3 rounded-md shadow-sm text-gray-700 hover:bg-blue-100 transition-colors duration-200`}
                        style={(opt === resultQuest?.selectedAnswer) && (resultQuest?.correctAnswer === opt) ? { background: 'green'}
                                : opt === resultQuest?.selectedAnswer ? {background: 'red'}
                                : opt === resultQuest?.correctAnswer ? {background: 'green'} : {}}
                    >
                        {opt}
                    </li>
        })}
            </ul>
        </div>
    );
};
