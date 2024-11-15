import { Link } from "react-router-dom";
import { IQuizies } from "../../features/quiz-template/types";

interface IProp {
    quiz: IQuizies
}

export const QuizItem: React.FC<IProp> = ({ quiz }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto my-4 border border-gray-200">
            <img
                src="https://cdn3.iconfinder.com/data/icons/rating-6/100/raterating_feedback-03-512.png"
                alt="Quiz Icon"
                className="w-12 h-12 mx-auto mb-4"
            />
            <strong className="block text-xl font-semibold text-gray-800 mb-2 text-center">
                {quiz.name}
            </strong>
            <small className="block text-gray-500 text-center">
                Number of questions: {quiz.questions.length}
            </small>
            <div className="flex justify-center gap-4 mt-4">
                <Link
                    to={'quiz/pass/' + quiz.id}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Pass
                </Link>
                <Link
                    to={'quiz/edit/' + quiz.id}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                    Edit
                </Link>
                <Link
                    to={'quiz/results/' + quiz.name}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Results
                </Link>
            </div>
        </div>
    );
};
