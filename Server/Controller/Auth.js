import { User} from '../Models/User';


class Auth{
    
    static login(req,res){
        User.findOne({'email': req.body.email}, (err, user)=> {
            if(!user) return res.status(404).send({
                loginSuccess:false, 
                message:'Auth false, email not found'
            })
            user.comparePassword(req.body.password)
                .then(isMatch => {
                    if(isMatch){
                       return user.generateToken()
                            .then(user => {
                                res.cookie('x_auth', user.token)
                                    .status(200).send({
                                        loginSuccess:true
                                    })
                            })
                            .catch(err => {
                                 res.status(400).send(err)
                            })
                    }
                    return res.status(404).send({loginSuccess: false, message: 'authentication failed'})
                })
                .catch(err => {
                    return res.status(404).send({
                        loginSuccess:false, 
                        message:'Auth false, password not found'
                    })
                })
        })
    }
    static register(req, res){
        const user = new User(req.body);
        user.save((err, doc) => {
            if (err) return res.status(400)
                .send({ success: false, err })
            Auth.login(req, res)
        })
    }
}

export default Auth;