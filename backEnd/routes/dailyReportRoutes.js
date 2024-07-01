import express from 'express';
const router = express.Router();
import { getDailyReports } from '../controllers/dailyReportController.js'; // Import the getDailyReports controller function

router.route('/reports')
    .get(getDailyReports) // GET all daily reports

export default router;