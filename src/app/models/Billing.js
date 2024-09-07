import { mongoose} from "mongoose";
import { isAlpha, isCreditCard, isInt } from "validator";

const BillingSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true, validate: [isCreditCard, 'Card number must be a number']},
    securityNumber: { type: Number, required: true, validate: [isInt, 'Security code must be a number']},
    nameOnCard: { type: String, required: true, validate: [isAlpha, 'Name on card must be alphabets']},
    expiryDate: { type: Number, required: true, validate: [isInt, 'Date must be a number']},
    cardType: { type: String, required: true},

}, {timestamps: true});


export const Billing = mongoose.models?.Billing || mongoose.model('Billing', BillingSchema);