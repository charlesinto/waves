import mongoose from 'mongoose';

const brandSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlenght:100,
        unique:1
    },
    DateCreated:{
        type: Date,
        required: true
    },
    createdBy:{
        type: String,

    },
    createdByFullName:{
        type: String
    },
    DateModified:{
        type: Date
    }
})

const Brand = mongoose.model('Brand', brandSchema);

export { Brand};
