import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import { User} from './Models/User'
import { auth } from './Middleware/Auth';
import { Admin } from './Middleware/Admin';
import { Brand } from './Models/Brand';
import { Wood } from './Models/Wood';
import { Product } from './Models/Product';
import 'dotenv/config'
import { isMaster } from 'cluster';

const app = express();


mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE);

const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cookieParser());

//
// BRAND
//
app.post('/api/products/brand', auth,Admin, (req, res)=> {
    const brand = new Brand({...req.body, createdBy:req.user._id, 
                        DateCreated: new Date(), createdByFullName: `${req.user.name} ${req.user.lastname}` })
    brand.save((err, doc) => {
        if(err) return res.status(400).send({success: false})
        res.status(200).send({success: true, brand:doc})
    })
})

app.get('/api/products/brand', auth, Admin, (req, res) => {
    Brand.find({}, (err, doc) => {
        if(err) return res.status(404).send({message:'Not Found'})
        return res.status(200).send({brands:doc})
    })
})


//====================
//   PRODUCT
//=======================


app.post('/api/products/item', auth,Admin, (req, res)=> {
    const product = new Product({...req.body})
    product.save((err, doc) => {
        if(err) return res.status(400).send({success: false, err})
        res.status(200).send({success: true, product:doc})
    })
})

//==================================
// GET PRODUCT BY ID
//{{url}}/api/products/get_item_by_id?id=5b2d38027d75e2cdcb31cf04,IJIJJJ0KJ09
//=============================

app.get('/api/products/get_item_by_id', (req, res)=> {
    const ids = req.query.id;
    const items = ids.split(',')
                    .map(item => mongoose.Types.ObjectId(item))
    Product
    .find({'_id': {$in: items}})
    .populate('brand')
    .populate('wood')
    .exec((err, doc) => {
        if(err) return res.status(404)
                        .send({message:'Not found', err})
        return res.status(200)
                .send({product: doc})
    })
})

//=======================================
//
//        SORT PRODUCTS BY ODER
//{{url}}/api/products/get_item_by_order?sortby=createdAt&order=desc&limit=100
//
//=================================

app.use('/api/products/get_items_by_order', (req, res)=> {
    const sortBy = req.query.sortby ? req.query.sortby : 'createdAt';
    const order = req.query.order ? req.query.order : 'desc';
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.find()
    .populate('brand')
    .populate('wood')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, doc) => {
        if(err) return res.status(404).send({message:'Not found', err});
        return res.status(200).send({product: doc})
    })

})

//
// WOOD
//


app.post('/api/products/wood', auth,Admin, (req, res)=> {
    const wood = new Wood({...req.body, createdBy:req.user._id, 
                        DateCreated: new Date(), createdByFullName: `${req.user.name} ${req.user.lastname}` })
    wood.save((err, doc) => {
        if(err) return res.status(400).send({success: false})
        res.status(200).send({success: true, wood:doc})
    })
})

app.get('/api/products/wood', auth, Admin, (req, res) => {
    Wood.find({}, (err, doc) => {
        if(err) return res.status(404).send({message:'Not Found'})
        return res.status(200).send({brands:doc})
    })
})

//======
//  USERS
//=============

app.post('/api/users/auth', auth , (req, res) => {
    const { email, name, lastname, cart, history, role} = req.user;
    res.status(200).send({
        isAdmin: role === 0 ? false : true,
        isAuth: true,
        user: { 
            email,
            name,
            lastname,
            role,
            cart,
            history
        }
    })
}) 

app.get('/api/users/logout', auth, (req, res) => {
    console.log('rid ', req.user._id)
    User.findOneAndUpdate({_id: req.user._id},
        {token:''}, (err, doc) => {
            if(err) return res.status(400).send({ success: false })
            return res.status(200)
                        .send({
                            success: true
                        })
        })
})

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
})

app.listen(port, () => {
    console.log(`Server is Listening at ${port}`)
});

export default app;