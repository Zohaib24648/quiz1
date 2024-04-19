const jwt = require('jsonwebtoken');
const SECURITY_KEY = 'ZohaibMughal';  // Directly defined, used for JWT

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECURITY_KEY, (err, user) => {  // Directly use SECURITY_KEY
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
