import { DAILY_REPORT_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";


export const dailyReportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        report: builder.mutation({
            query: (data) => ({
                url: `${DAILY_REPORT_URL}/reports`,
                method: 'PUT',
                body: data,
            }),
        }),
    })
});

export const { 
    useReportMutation 
} = dailyReportApiSlice;

