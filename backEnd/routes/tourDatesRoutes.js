import express from 'express';
const router = express.Router();
import {
    getTourDates,
    getTourDateByVenue,
    createTourDate,
    updateTourDate,
    deleteTourDate
} from '../controllers/tourDatesController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getTourDates).post(protect, admin, createTourDate);
router.route('/:venue').get(getTourDateByVenue).put(protect, admin, checkObjectId, updateTourDate).delete(protect, admin, checkObjectId, deleteTourDate);

export default router;