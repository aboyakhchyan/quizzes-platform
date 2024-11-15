import { Link, Outlet } from "react-router-dom";

export const Dashboard = () => {
    const user = sessionStorage.getItem('userName') || 'Guest';

    return (
        <div className="relative p-6 bg-yellow-200 min-h-screen">
            <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md rounded-lg">
                <Link 
                    to='quiz/create'
                    className="text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded-lg"
                >
                    Create
                </Link>

                <h1 className="text-2xl font-extrabold text-blue-700 tracking-wide">
                    Quizzes Platform
                </h1>
                
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg">
                        {user.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-gray-700 font-semibold text-lg">{user}</h2>
                </div>
            </header>
            <div className="mt-6">
                <Outlet />
            </div>
        </div>
    );
};
