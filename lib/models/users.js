import mongoose from 'mongoose';

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true     
    },
    image: {
        type: String,
        required: true,
        
    },
    portrait: {
        type: String,
        default: '',
    }
},
{timestamps: true}
);

const users = mongoose.models.users || mongoose.model('users', user);

export default users;