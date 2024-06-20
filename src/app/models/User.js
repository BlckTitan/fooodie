import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: {
        type: String, 
        required: true, 
        validate: pass => {
            if(!pass?.length || pass.length < 8) {
                new Error('Password should be at least 8 characters')
            }
        }
    }
}, {timestamps: true})

export const User = models?.User || model('User', UserSchema);