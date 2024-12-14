import {Mongoose, mongoose} from "mongoose";
import bcrypt from 'bcrypt'
import { isEmail, isAlphanumeric, isAlpha, isCreditCard, isInt} from 'validator';
import {AddressSchema} from './Address';
import {BillingSchema} from './Billing';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, validate: [isEmail, 'Please enter a valid email address']},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    username: { type: String, required: true},
    phone: { type: String},
    password: {
        type: String, 
        required: true, 
        minlength: 8,
        validate: [isAlphanumeric, 'Password should contain letters and numbers']
    },
    image: {type: new mongoose.Schema({
        public_id: String,
        secure_url: String, 
    })},
    // address: {type: new mongoose.Schema({
    //     country: { type: String, required: true, validate: [isAlpha, 'Country must be alphabets']},
    //     state: { type: String, required: true, validate: [isAlpha, 'State must be alphabets']},
    //     city: { type: String, required: true, validate: [isAlpha, 'City must be alphabets']},
    //     region: { type: String, required: true, validate: [isAlpha, 'Region must be alphabets']},
    //     street: { type: String, required: true, validate: [isAlpha, 'Street must be alphabets']},
    // })},
    // billing: { type: new mongoose.Schema({
    //     cardNumber: { type: String, required: true, validate: [isCreditCard, 'Card number must be a number']},
    //     securityNumber: { type: Number, required: true, validate: [isInt, 'Security code must be a number']},
    //     nameOnCard: { type: String, required: true, validate: [isAlpha, 'Name on card must be alphabets']},
    //     expiryDate: { type: Number, required: true, validate: [isInt, 'Date must be a number']},
    //     cardType: { type: String, required: true},
    // })},

}, {timestamps: true});

// UserSchema.methods.hashUserPassword = function(user){
//     const salt = bcrypt.genSaltSync(10);
//     const password = user.password;
//     return user.password = bcrypt.hashSync(password, salt);
// }

UserSchema.post('validate', function(user){
    const salt = bcrypt.genSaltSync(10);
    const password = user.password;
    return user.password = bcrypt.hashSync(password, salt); 
})

export const User = mongoose.models?.User || mongoose.model('User', UserSchema);