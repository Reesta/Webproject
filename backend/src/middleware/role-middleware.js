export const isAdmin = async (req, res, next) => {
    try {
        if (req.user && req.user.user && req.user.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Admin only.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const isUser = async (req, res, next) => {
    try {
        if (req.user && req.user.user && (req.user.user.role === 'user' || req.user.user.role === 'admin')) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Authentication required.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};