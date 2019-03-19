import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import { User} from './Models/User'

import 'dotenv/config'

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

app.listen(port, () => {
    console.log(`Server is Listening at ${port}`)
});

export default app;