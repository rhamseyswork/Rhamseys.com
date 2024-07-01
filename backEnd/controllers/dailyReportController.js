import https from 'https'; // Importing 'https' as an ES module

import asyncHandler from '../middleware/asyncHandler.js'; // Adjust path as per your project structure

// Environment variables
const RAPIDAPI_API_URL = process.env.RAPIDAPI_API_URL;
const RAPIDAPI_API_KEY = process.env.RAPIDAPI_API_KEY;

//@desc Get daily reports from RapidAPI
//@route GET /api/dailyreport/reports
//@access Public
const getDailyReports = asyncHandler(async (req, res) => {
    try {
        const options = {
            method: 'GET',
            hostname: 'real-time-finance-data.p.rapidapi.com',
            path: '/stock-time-series-source-2?symbol=AAPL&period=1D',
            headers: {
                'x-rapidapi-key': '3329ce90d2mshfff23d22225e84cp10d417jsn2fb5e8c7a837',
                'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
            }
        };

        const req = https.request(options, (response) => {
            let chunks = '';

            response.on('data', (chunk) => {
                chunks += chunk;
            });

            response.on('end', () => {
                console.log(chunks); // Here you can handle the response data
                res.status(200).json(JSON.parse(chunks)); // Send response to client
            });
        });

        req.on('error', (error) => {
            console.error('Error fetching daily reports:', error);
            res.status(500).json({ error: 'Server error' });
        });

        req.end(); // End the request

    } catch (error) {
        console.error('Error fetching daily reports:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export { getDailyReports };
