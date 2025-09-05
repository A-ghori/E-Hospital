export const facultyAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(' ')[1]; // Bearer token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.faculty = decoded;
        next();
    } catch (err) {
        console.log('Invalid token', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};