const mongoose = require('mongoose');
const post = require('./post');

const postSchema = new mongoose.Schema({
    post_img: String,
    post_title: String,
    post_data: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
comment:[
    {
        type: String
    }
]

}, {timestamps:true});

module.exports = mongoose.model('post', postSchema);






















// const mongoose = require('mongoose');
// const post = require('./post')


// const postSchema = new mongoose.Schema({
//     imgeText: {
//         type: String
//     },
//     comect: {
//         type: String
//     },
//     img: {
//         type: String
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user'
//     },
//     likes: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'user'
//         }
//     ]

// }, { timestamps: true });

// module.exports = mongoose.model('post', postSchema);