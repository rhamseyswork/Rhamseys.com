import { PRODUCTS_URL, UPLOADS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber, keyword}) => ({
              url: PRODUCTS_URL,
              params: { pageNumber, keyword },
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
          }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        updateProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOADS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }), 
        getTopProducts: builder.query({
            query: (data) => ({
                url: `${PRODUCTS_URL}/top`,
                body: data,
            }),
            keepUnusedDataFor: 5,
        }),
        getLatestProducts: builder.query({
            query: (data) => ({
                url: `${PRODUCTS_URL}/top`,
                body: data,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { 
    useGetProductsQuery, 
    useGetProductDetailsQuery, 
    useCreateProductMutation, 
    useUpdateProductMutation,
    useUpdateProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
    useGetLatestProductsQuery
} = productsApiSlice;