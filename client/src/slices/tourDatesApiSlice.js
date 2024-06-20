import { TOUR_DATES_URL } from "../constants";
import { apiSlice } from "./apiSlice.js";

export const tourDatesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTourDates: builder.query({
            query: ({ pageNumber, keyword}) => ({
              url: TOUR_DATES_URL,
              params: { pageNumber, keyword },
            }),
            keepUnusedDataFor: 5,
            providesTags: ['TourDates'],
          }),
        createTourDate: builder.mutation({
            query: () => ({
                url: TOUR_DATES_URL,
                method: 'POST',
            }),
            invalidatesTags: ['TourDates'],
        }),
        updateTourDate: builder.mutation({
            query: (data) => ({
                url: `${TOUR_DATES_URL}/${data.tourDateVenue}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['TourDates'],
        }),
        delteTourDate: builder.mutation({
            query: (tourDateVenue) => ({
                url: `${TOUR_DATES_URL}/${tourDateVenue}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { 
  useGetTourDatesQuery,
  useCreateTourDateMutation,
  useUpdateTourDateMutation,
  useDeleteTourDateMutation,
 } = tourDatesApiSlice;