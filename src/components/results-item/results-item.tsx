import { useEffect, useState } from "react";
import { IResultTest } from "../../features/quiz-template/types";

interface IProp {
    result: IResultTest;
}

export const ResultsItem: React.FC<IProp> = ({ result }) => {
    const [numberCorrectResult, setNumberCorrectResult] = useState<number>(0);

    useEffect(() => {
        let correct = 0;
        result.answers[0].questions.forEach(res => {
            if (res.correctAnswer === res.selectedAnswer) {
                correct++;
            }
        });
        setNumberCorrectResult(correct);
    }, [result]);

    return (
        <tr className="bg-white hover:bg-gray-50 border-b transition-colors duration-300">
            <td className="px-6 py-4 text-gray-700 font-medium">{result.userName}</td>
            <td className="px-6 py-4 text-gray-600">{result.answers[0].quizName}</td>
            <td className="px-6 py-4 text-green-600">
                {numberCorrectResult} / {result.answers[0].questions.length}
            </td>
        </tr>
    );
};
