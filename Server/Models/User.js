import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT = 10;

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim:true,
        unique:1
    },
    password:{
        type: String,
        required:true,
        minlength:5
    },
    name:{
        type:String,
        required: true,
        maxlength:100
    },
    lastname:{
        type:String,
        required: true,
        maxlength:100
    },
    cart:{
        type:Array,
        default:[]
    },
    history:{
        type:Array,
        default:[]
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    }
});

userSchema.pre('save', function(next){
    const user = this;
    user.isModified('password') ?
    bcrypt.genSalt(SALT, (err, salt)=> {
        if(err) return next(err);
        bcrypt.hash(user.password,salt, (err,hash)=> {
            if(err) return next(err);
            user.password = hash;
            next();
        })
    }) : next()

})

userSchema.methods.comparePassword =function (password) {
    return new Promise((resolve, reject)=> {
        bcrypt.compare(password,this.password, (err, isMatch)=> {
            if(err) return reject(err);
            resolve(isMatch);
        })
    })
}

userSchema.methods.generateToken = function(){
    const user = this;
    return new Promise( (resolve, reject) => {
        const token =  jwt.sign(user._id.toHexString(), process.env.SECRET_KEY);
        user.token = token;
        user.save(function(err, user){
                if(err) return reject(err);
                return resolve(user)
        })
    })
}

const User = mongoose.model('User', userSchema);

export  {User};