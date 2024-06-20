import asyncHandler from '../middleware/asyncHandler.js'
import TourDates from '../models/tourDatesModel.js'

//@desc Fetch all Tour Dates
//@route GET /api/tourdates
//@access Public
const getTourDates = asyncHandler(async (req, res) => {  
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {name: { $regex: req.query.keyword, $options: 'i' }} : {};

    const count = await TourDates.countDocuments({...keyword});

    const tourDates = await TourDates.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({tourDates, page, pages: Math.ceil(count / pageSize)});
});

//@desc Fetch a Tour
//@route GET /api/tourdates/:venue
//@access Public
const getTourDateByVenue= asyncHandler(async (req, res) => {
    const tourDates = await TourDates.findById(req.params.venue);

    if(tourDate){
        return res.json(tourDates);
    } else{
        res.status(404);
        throw new Error('Resource not found');
    }
});

//@desc Create a Tour Date
//@route POST /api/tourdates
//@access Private/Admin
const createTourDate = asyncHandler(async (req, res) => {
    const tourDate = new TourDates({
        user: req.user._id,
        venue: 'Sample venue',
        date: Date.now(),
        location: 'Sample location',
        price: 0,
        countInStock: 0,
    });

    const createdTourDate = await tourDate.save();
    res.status(201).json(createdTourDate);
});

//@desc Update a Tour Date
//@route PUT /api/products/:venue
//@access Private/Admin
const updateTourDate = asyncHandler(async (req, res) => {
    const { venue, date, location, price } = req.body;

    const tourDate = await TourDates.findById(req.params.venue);

    if(tourDate){
        tourDate.user = req.user._id;
        tourDate.venue = venue;
        tourDate.date = date;
        tourDate.location = location;
        tourDate.price = price;
        tourDate.countInStock = countInStock;

        const updatedTourDate = await tourDate.save();
        res.json(updatedTourDate);
    }
    else{
        res.status(404);
        throw new Error('Resource not found');
    }
});

//@desc Delete a Tour Date
//@route DELETE /api/products/:venue
//@access Private/Admin
const deleteTourDate = asyncHandler(async (req, res) => {
    const tourDate = await TourDates.findById(req.params.venue);

    if(tourDate){
        await tourDate.deleteOne({_id: tourDate._id});//this could throw a error cuz in models no id
        res.stauts(200).json({ message: 'Tour Date deleted' });
    }
    else{
        res.status(404);
        throw new Error('Resource not found');
    }
});

export {
    getTourDates,
    getTourDateByVenue,
    createTourDate,
    updateTourDate,
    deleteTourDate
};