const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordResetSchema = new Schema({
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },

    resetToken: {
        type: String,
        required: true
    }
    
}, {timestamps: true}, {collection: "passwordResets"});

const PasswordReset = mongoose.model("passwordResets", passwordResetSchema);
module.exports = PasswordReset;