const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/upload');
    } catch (error) {
        if(error) throw error;
    }
})();


const userschema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String
      },
    dp_img: {
        type: String
      },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }],

}, { timestamps: true });



userschema.plugin(plm);
module.exports = mongoose.model('user', userschema);














// const mongoose = require('mongoose');
// const plm = require('passport-local-mongoose');

// (async () => {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/mycodeisfemas');
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// })();

// const userschema = new mongoose.Schema({
//     username: {
//         type: String,
//         unique: true,
//         require: true
//     },
//     password: {
//         type: String
//     },
//     fullname: {
//         type: String,
//         require: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         require: true
//     },
//     phone: {
//         type: Number,
//         unique: true,
//         require: true
//     },
//     dp_img: {
//         type: String,
//     },
//     tag: {
//         type: Array,
//         default: []
//     },
//     post: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'post'
//         }
//     ],
//     bio: {
//         type: String,
//     },
//     follow: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'user'
//         }
//     ],
//     following: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'user'
//         }
//     ],
// }, { timestamps: true });

// userschema.plugin(plm);

// module.exports = mongoose.model('user', userschema);


