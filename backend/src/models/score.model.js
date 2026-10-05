import mongoose, {Schema} from "mongoose";

const scoreSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    score: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

export const Score = mongoose.model("Score", scoreSchema)