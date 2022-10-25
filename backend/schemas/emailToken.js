const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },

    token: {
        type: String,
        required: true,
    }
}, {timestamps: true}, {collection: "emailtokens"});

const _tokenSchema = mongoose.model("emailtokens", tokenSchema);
module.exports = _tokenSchema;