import { mongoose} from "mongoose";
import bcrypt from 'bcrypt'
import { isEmail, isAlphanumeric } from 'validator';

const AdminSchema = new mongoose.Schema({
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
    // isAdmin: { type: Boolean, required: true, default: false}

}, {timestamps: true});

AdminSchema.post('validate', function(admin){
    const salt = bcrypt.genSaltSync(10);
    const password = admin.password;
    return admin.password = bcrypt.hashSync(password, salt); 
})

export const Admin = mongoose.models?.Admin || mongoose.model('Admin', AdminSchema);