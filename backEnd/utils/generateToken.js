import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    //set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // only in production with HTTPS
        sameSite: 'strict', //prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
}

export default generateToken;