import jst from 'jsonwebtoken'
import pkg from 'cookie-parser';
const {cookieParser} = pkg;

const isAuthenticated = async (req, res)=>{
    try {
        const token = req.cookieParser.token;
        if(!token){
            return res.status(401).json({
                message: "user not authenticated",
                success: false
            })
        }

        const decodeToken = await jwt.decodeToken(token, process.env.SECRET_KEY);
        if(!decodeToken){
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }


        req.id = decodeToken.userId;
        next();
    } catch (error) {
        console.log(error);
        
    }
}
export default isAuthenticated;