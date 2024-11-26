const authorize = (roles) => (req, res, next) => {
    console.log(roles, req.user.role);
    if(!roles.includes(req.user.role)){
        return res.status(403).json({ message: "Forbidden" })
    }
    next();
}

module.exports = authorize;