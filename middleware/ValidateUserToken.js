const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, 
            (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({
                        message: "Invalid token",
                        error: err
                    });
                } else {
                    req.user = decodedToken.user;
                    next();
                }
                
            }
        );

        if(!token) {
            return res.status(401).json({
                message: "No token provided"
            });
            
        }
    } else {
        return res.status(401).json({
            message: "No token provided"
        });
    }
};

module.exports = validateToken;