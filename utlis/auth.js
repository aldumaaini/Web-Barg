const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config({ path: './.env' });
const SECRETKEY = process.env.SECRETKEY || '';
'';


const verifyJWT = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token, Access denied' })
    } else {
        jwt.verify(token, SECRETKEY, (err, decoded) => {
            console.log('decoded: ', decoded)
            if (err) {
                return res.status(401).json({ auth: false, message: 'Token not valid !!' })
            } else {
                req.user = decoded.userID;
                next();
            }
        })
    }
}
module.exports = {
    verifyJWT
};