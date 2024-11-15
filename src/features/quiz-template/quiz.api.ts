import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IQuizies, IResultQuiz, IResultTest } from "./types";

export const quizApi = createApi({
    reducerPath: 'quiz',
    tagTypes: ['quiz'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3004'}),
    endpoints: builder => ({
        getQuizzes: builder.query<IQuizies[], null>({
            query: () => `/tests`,
            providesTags: ['quiz']
        }),
        getResultTests: builder.query<IResultQuiz[], null>({
            query: () => `/results`
        }),
        getEditQuiz: builder.query<IQuizies[], string | undefined>({
            query: (id: string) => `/tests?id=${id}`
        }),
        saveEditQuiz: builder.mutation<IQuizies, IQuizies>({
            query: (data) => ({
                url: `/tests/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['quiz']
        })
    })
})

export const {useGetQuizzesQuery,
              useGetResultTestsQuery,
              useSaveEditQuizMutation} = quizApi