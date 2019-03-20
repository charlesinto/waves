import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1
    },
    description:{
        required: true,
        type:String,
        maxlength:1000
    },
    price:{
        required: true,
        type: Number,
        maxlength: 200
    },
    brand:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Brand'
    },
    shipping:{
        required: true,
        type: Boolean
    },
    available:{
        required: true,
        type: Boolean
    },
    wood:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Wood'
    },
    frets:{
        required:true,
        type: Number
    },
    sold:{
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish:{
        type: Boolean,
        required: true
    },
    images:{
        type: Array,
        default:[]
    }
}, {timestamps:true});

const Product = mongoose.model('Product', productSchema);

export { Product }