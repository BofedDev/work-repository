import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const shopApi = createApi({
    reducerPath: 'shopApi',
    tagTypes: ['Products', 'Product'],

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com',
    }),

    endpoints: (build) => ({

        getProducts: build.query({
            query: ({ limit = 20, skip = 0, search = '', category = '' } = {}) => {
                if (search) {
                    return `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
                }
                if (category) {
                    return `/products/category/${category}?limit=${limit}&skip=${skip}`;
                }
                return `/products?limit=${limit}&skip=${skip}`;
            },
            providesTags: ['Products'],
        }),

        getProductById: build.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

        getCategories: build.query({
            query: () => '/products/categories',
        }),

        getProductsByCategory: build.query({
            query: (category) => `/products/category/${category}`,
            providesTags: ['Products'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
} = shopApi;