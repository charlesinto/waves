import { User } from '../Models/User';

const auth = async (req, res, next) => {
    const token = req.cookies.x_auth;
    try{
        const user = await User.findByToken(token);
        if(!user){
            return res.status(406).send({
                isAuth: false
            })
        }
        req.user = user;
        req.token = token;
        next()
    }catch(error){
       throw error;
       res.status(406).send({
           isAuth: false
       })
    }
    
}

export { auth };