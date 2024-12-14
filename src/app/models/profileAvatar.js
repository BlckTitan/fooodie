import { mongoose } from "mongoose";

const profileAvatarSchema = new mongoose.Schema({
    public_id: String,
    secure_url: String,

}, {timestamps: true});

export const ProfileAvatar = mongoose.models?.ProfileAvatar || mongoose.model('ProfileAvatar', profileAvatarSchema);