import User from "../models/user.js";
import jwt from 'jsonwebtoken'
//authorization
 const authCheck = async (req, res, next) => {
    if ( req.method === "OPTIONS" ) {
        return next()
    } else {
        try {
            const token = req.headers.authorization.split(' ') [1]
            if (!token) {
                console.log("authentication failed!");   
            } else {    
         
                const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
                const validUser = await User.findOne({ _id : decodedToken.userId })
                console.log(validUser);
                
                if (! validUser) {
                    console.log("Invalid credentials!");
                } else {
                    req.userDetails = { userId : decodedToken.userId, }
                    next()
                }

            }
        } catch (error) {
            console.log("Authentication failed!");
        }
    }

}

export default authCheck
