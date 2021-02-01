const mongoose = require("mongoose");
const { RolesEnum } = require('../../constants');
const Schema = mongoose.Schema; 

const AgentSchema = new Schema({
    name: String,
    password: String,
    isActive: { type: Boolean, default: true },
    role: { type: Number, default: 1, enum: RolesEnum },
    dateCreated: { type: Date, default: Date.now() },
});

const AgentModel = mongoose.model('Agent', AgentSchema);
module.exports = AgentModel;
