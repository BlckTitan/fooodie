import { mongoose} from "mongoose";
import {isAlpha} from 'validator';

const MenuSchema = new mongoose.Schema({

    title: { type: String, required: true},
    description: { type: String, required: false},
    image: {type: new mongoose.Schema({
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true}, 
    })},
    category: {type: new mongoose.Schema({
        name: { type: String, required: true}, 
    })},
    price: { type: Number, required: true },    
    rating: { type: Number, required: false }

}, {timestamps: true});

export const Menu = mongoose.models?.Menu || mongoose.model('Menu', MenuSchema);