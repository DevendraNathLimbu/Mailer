import User from "../model/user.model";

export const authMiddleware = async(req, res, next) => {
       try{
           const authHeader = req.headers.authorization;

           if(!authHeader || !authHeader.startsWith("Bearer ")){
               return res.status(401).send({
                message: "Invalid token or authorization"
               })
           }
           const token = authHeader.split(" ")[1];

           let decoder;
            try{
                   decoder = jwt.verify(token, process.env.SECRET_KEY);
                   }catch(err){
                   if(err.name == "TokenExpiryError"){
                       return res.status(401).json({
                           message: "Invalid token or token expired!"
                       })
                   }
                   return res.status(401).send({
                       message: "Error authenticating user! token error"
                   })
                   }

            const {id} = decoder;
            const user = await User.findById(id);

            if(!user){
                return res.status(401).json({
                    message: "User not found!"
                })
            }

            req.userId = user._id;

                   next();
       }catch(err){
            return res.status(400).send({
                message: "Authentication Error"
            })
       }
}