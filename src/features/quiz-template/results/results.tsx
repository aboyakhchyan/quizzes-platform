import { useParams } from "react-router-dom";
import { useGetResultTestsQuery } from "../quiz.api";
import { ResultsItem } from "../../../components/results-item/results-item";

export const Results = () => {
    const { data } = useGetResultTestsQuery(null);
    const { name } = useParams();

    const results = data?.filter(item => item.answers[0].quizName === name);

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Quiz Results</h2>

            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-blue-500 text-white text-left">
                        <th className="px-6 py-4">User Name</th>
                        <th className="px-6 py-4">Quiz Name</th>
                        <th className="px-6 py-4">Correct Answers</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        results && results.length > 0 ? (
                            results.map(res => (
                                <ResultsItem 
                                    key={res.id}
                                    result={res}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No results found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};
