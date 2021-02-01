const mongoose = require("mongoose");
const { StatusEnum } = require("../../constants");
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  deviceModel: String,
  manufacturer: String,
  problemSummary: String,
  description: String,
  status: {
    type: String,
    default: 0,
    enum: StatusEnum,
  },
  fixDescription: String,
  createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  assignedTo: { type: mongoose.Types.ObjectId, ref: "User" },
  logfilePath: { type: String, default: "" },
  dateCreated: { type: Date, default: Date.now() },
});

const ComplaintModel = mongoose.model("Complaint", ComplaintSchema);

module.exports = ComplaintModel;
