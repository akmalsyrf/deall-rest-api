const mongoose = require("mongoose")

let userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Nama harus diisi"],
        },
        email: {
            type: String,
            required: [true, "Email harus diisi"],
        },
        password: {
            type: String,
            required: [true, "Kata sandi harus diisi"],
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "admin",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);