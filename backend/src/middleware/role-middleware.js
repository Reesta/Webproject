export const isAdmin = async (req, res, next) => {
    try {
        // Handle both token structures for admin role check
        const userRole = req.user.user ? req.user.user.role : req.user.role;
        if (req.user && userRole === 'admin') {
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
        // Handle both token structures for user role check
        const userRole = req.user.user ? req.user.user.role : req.user.role;
        if (req.user && (userRole === 'user' || userRole === 'admin')) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Authentication required.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};