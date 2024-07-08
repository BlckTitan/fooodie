import { Schema, model, models, mongoose} from "mongoose";
import bcrypt from 'bcrypt'
import { isEmail, isAlphanumeric} from 'validator';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, validate: [isEmail, 'Please enter a valid email address']},
    
    password: {
        type: String, 
        required: true, 
        minlength: 8,
        validate: [isAlphanumeric, 'Password should contain letters and numbers']
    }

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