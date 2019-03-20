import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import { User} from './Models/User'

import 'dotenv/config'
import { isMaster } from 'cluster';

const app = express();


mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE);

const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cookieParser());

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if(err) return res.status(400)
                .send({success:false, err})
        res.status(200).send({
            success: true,
            user: doc
        })
    })
    
})

app.post('/api/users/login', (req, res)=> {
    User.findOne({'email': req.body.email}, (err, user)=> {
        if(!user) return res.status(404).send({
            loginSuccess:false, 
            message:'Auth false, email not found'
        })
        user.comparePassword(req.body.password)
            .then(isMatch => {
                if(isMatch){
                    user.generateToken()
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
            })
            .catch(err => {
                return res.status(404).send({
                    loginSuccess:false, 
                    message:'Auth false, password not found'
                })
            })
    })
})

app.listen(port, () => {
    console.log(`Server is Listening at ${port}`)
});

export default app;