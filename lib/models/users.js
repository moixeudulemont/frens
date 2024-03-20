import mongoose from 'mongoose';

const user = new mongoose.Schema({
    name: String,
    email: String,
    image: String
},
{timestamps: true}
);

const users = mongoose.models.users || mongoose.model('users', user);

export default users;