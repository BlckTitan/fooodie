import { mongoose} from "mongoose";
import {isAlpha} from 'validator';

const AddressSchema = new mongoose.Schema({
    country: { type: String, required: true, validate: [isAlpha, 'Country must be alphabets']},
    state: { type: String, required: true, validate: [isAlpha, 'State must be alphabets']},
    city: { type: String, required: true, validate: [isAlpha, 'City must be alphabets']},
    region: { type: String, required: true, validate: [isAlpha, 'Region must be alphabets']},
    street: { type: String, required: true, validate: [isAlpha, 'Street must be alphabets']},

}, {timestamps: true});

export const Address = mongoose.models?.Address || mongoose.model('Address', AddressSchema);