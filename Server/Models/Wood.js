import mongoose from 'mongoose';

const woodSchema = mongoose.Schema({
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

const Wood = mongoose.model('Wood', woodSchema);

export { Wood };
