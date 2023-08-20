import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
        'X-RapidAPI-Key': import.meta.env.VITE_COINRANKING_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_COINRANKING_HOST
}


const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_RAPID_COIN_RANKING_URL }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
                query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetail: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistroy: builder.query({
            query: ({coinId, timePeriod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        }),
        getExchanges: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}/exchanges`)
        })
    }),
})


export const { useGetCryptosQuery, useGetCryptoDetailQuery, useGetCryptoHistroyQuery, useGetExchangesQuery } = cryptoApi
