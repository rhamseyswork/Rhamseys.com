const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    });
  };
  
export default asyncHandler;