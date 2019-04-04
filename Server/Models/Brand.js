import mongoose from 'mongoose';

const brandSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlenght:100,
        unique:1
    },
    createdBy:{
        type: String,

    },
    createdByFullName:{
        type: String
    }
}, {timestamps:true})

const Brand = mongoose.model('Brand', brandSchema);

export { Brand};
