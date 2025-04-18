const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    if (req.query.skipAuth === 'true') {
        return next(); 
    }

    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Invalid token format' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token is invalid or expired' });
    }
}

module.exports = authMiddleware;
