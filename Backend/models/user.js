const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const userSchema =  new Schema({
    'name' : String,
    'age' : Number,
    'email' : String,
    'phoneNo' : Number,
    'password' : String,
    'role' : String,
    'teacherId' : {
        'type' : ObjectId,
        'default' : null
    },
    'profile' : String
    // 'address': {
    //     'doorNo':Number,
    //     'streetName':String,
    //     'district':String,
    //     'pinCode':Number
    // }
})

let userModel = mongoose.model('user', userSchema, 'user');


module.exports =  userModel;