import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const headers = {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': import.meta.env.VITE_NEWS_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_NEWS_HOST
}

const createRequest = (url) => ({url, headers: headers})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_RAPID_NEWS_URL}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi