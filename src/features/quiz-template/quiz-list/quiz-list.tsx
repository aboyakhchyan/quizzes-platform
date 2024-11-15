import { QuizItem } from "../../../components/quiz-item/quiz-item";
import { useGetQuizzesQuery } from "../quiz.api";

export const QuizList = () => {
    const { data } = useGetQuizzesQuery(null);

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
                {data && data.map((item) => (
                    <QuizItem key={item.id} quiz={item} />
                ))}
            </div>
        </div>
    );
};
