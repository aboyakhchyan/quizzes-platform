import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./features/quiz-template/login/login"
import { Dashboard } from "./features/quiz-template/dashboard/dashboard"
import { QuizList } from "./features/quiz-template/quiz-list/quiz-list"
import { PassQuiz } from "./features/quiz-template/pass-quiz/pass-quiz"
import { EditQuiz } from "./features/quiz-template/edit-quiz/edit-quiz"
import { CreateQuiz } from "./features/quiz-template/create-quiz/create-quiz"
import { ResultPage } from "./features/quiz-template/result-page/result-page"
import { Results } from "./features/quiz-template/results/results"

const routes = createBrowserRouter([
  {
    path: '',
    element: <Login/>
  },
  {
    path: 'dashboard',
    element: <Dashboard/>,
    children: [
      {
        path: '',
        element: <QuizList/>
      },
      {
        path: 'quiz/pass/:id',
        element: <PassQuiz/>
      },
      {
        path: 'quiz/edit/:id',
        element: <EditQuiz/>
      },
      {
        path: 'quiz/create',
        element: <CreateQuiz/>
      },
      {
        path: 'quiz/result/:name/:test',
        element: <ResultPage/>
      },
      {
        path:'quiz/results/:name',
        element: <Results/>
      }
    ]
  }
])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    // <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={routes}>
        </RouterProvider>
      </Provider>
    // </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}

