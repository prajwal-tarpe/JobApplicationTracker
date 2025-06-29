const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    jobs: [
        {
            companyName: { type: String, required: true },
            jobTitle: { type: String, required: true },
            applicationDate: { type: Date, required: true },
            status: {
                type: String,
                enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
                default: 'Applied',
            },
            notes: { type: String },
            jobLink: { type: String }
        }
    ]
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;