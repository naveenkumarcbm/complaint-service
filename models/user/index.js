const mongoose = require("mongoose");
const { RolesEnum } = require('../../constants');
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    name: String,
    password: String,
    isActive: { type: Boolean, default: true },
    role: { type: Number, default: 2, enum: RolesEnum },
    dateCreated: { type: Date, default: Date.now() },
});
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel; 