import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    address: {
        street_1: {
            type: String,
            required: true
        },
        street_2: {
            type: String,
            required: true
        },
    },
    residential_address: {
        street_1: {
            type: String,
            required: true
        },
        street_2: {
            type: String,
            required: true
        },
    },
    documents: [{
        type: mongoose.Schema.Types.Mixed,
    }],
    created_at: {
        type: Number,
        default: () => Math.ceil(new Date().getTime() / 1000)
    },
    updated_at: {
        type: Number,
        default: () => Math.ceil(new Date().getTime() / 1000)
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;