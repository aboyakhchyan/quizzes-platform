import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserName } from "../tests.slice"
import { useAppDispatch } from "../../../app/hooks"

export const Login = () => {

    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogin = (evt: FormEvent): void => {
        evt.preventDefault()

        dispatch(getUserName(name))
        .unwrap()
        .then(response => {
            if(Array.isArray(response) && response.length !== 0) {
                setError('This name is already taken')
            }else if(Array.isArray(response) && response.length == 0) {
                setError('')
                sessionStorage.setItem('userName', name)
                navigate('/dashboard')
                setName('')
            }
        })
    }

    return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-yellow-200">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Login for Quizzes
            </h2>
            <form 
                className="space-y-4"
                onSubmit={handleLogin}
            >
            <div>
                <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
                >
                Username
                </label>
                <input
                type="text"
                id="username"
                name="username"
                value={name}
                onChange={evt => setName(evt.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your username"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
                Log In
            </button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
        </div>
    </>
  )
}
