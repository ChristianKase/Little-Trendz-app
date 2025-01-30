import { base_url } from "../database";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (category) => {
                
                return `products.json?orderBy="category"&equalTo="${category}"`;
            },
            transformResponse: (response) => {
            
                return response;
            },
        }),
        getCategories: builder.query({
            query: () => {
            
                return "categories.json";
            },
            transformResponse: (response) => {
               
                return response;
            },
        }),
    }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = shopApi;
