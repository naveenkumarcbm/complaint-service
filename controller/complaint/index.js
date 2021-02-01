const bcrypt = require("bcrypt");
const { StatusMap } = require("../../constants");
const AgentModel = require("../../models/agent");
const ComplaintModel = require("../../models/complaint");
const UserModel = require("../../models/user");
const getLoggedInUser = require("../../util");

class ComplaintController {
  constructor() {}

  async getAllUserComplaints(req, res) {
    const { sortBy = "dateCreated", order = -1, limit = 10 } = req.query;
    try {
      const loggedInUser = getLoggedInUser(req, res);
      const complaints = await ComplaintModel.find({createdBy: loggedInUser.id })
        .populate("assignedTo", "_id name")
        .populate("createdBy", "_id name")
        .sort({ [sortBy]: order })
        .limit(Number(limit))
        .exec();
      res.json(complaints);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async getAllComplaints(req, res) {
    const { sortBy = "dateCreated", order = -1, limit = 50 } = req.query;
    try {
      const complaints = await ComplaintModel.find()
        .populate("assignedTo", "_id name")
        .populate("createdBy", "_id name")
        .sort({ [sortBy]: order })
        .limit(Number(limit))
        .exec();
      res.json(complaints);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async getComplaintById(req, res) {
    try {
      const complaint = await ComplaintModel.findById(req.params.id);
      let resp = {
        complaintId: complaint._id,
        dateCreated: complaint.dateCreated,
        status: StatusMap[complaint.status] || complaint.status,
      };
      res.json(complaint);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async getComplaintDetail(req, res) {
    try {
      const complaint = await ComplaintModel.findById(req.params.id);
      res.json(complaint);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async addComplaint(req, res) {
    try {
      const loggedInUser = getLoggedInUser(req, res);
      req.body.createdBy = loggedInUser.id;
      let model = new ComplaintModel(req.body);
      const complaint = await model.save();
      let resp = {
        complaintId: complaint._id,
        dateCreated: complaint.dateCreated,
      };
      res.json(resp);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async updateComplaint(req, res) {
    try {
      const complaint = await ComplaintModel.findByIdAndUpdate(
        req.body._id,
        req.body
      );
      let resp = {
        complaintId: complaint._id,
        dateCreated: complaint.dateCreated,
      };
      res.json(resp);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async assignComplaint(req, res) {
    try {
      let body = req.body;
      const complaint = await ComplaintModel.findByIdAndUpdate(
        req.params.id,
        body
      );
      let resp = {
        complaintId: complaint._id,
        dateCreated: complaint.dateCreated,
      };
      res.json(resp);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async fixComplaint(req, res) {
    try {
      let body = req.body;
      body.status = 2;
      const complaint = await ComplaintModel.findByIdAndUpdate(
        req.params.id,
        body
      );
      let resp = {
        complaintId: complaint._id,
        dateCreated: complaint.dateCreated,
      };
      res.json(resp);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

module.exports = ComplaintController;
