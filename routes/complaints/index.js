const express = require("express");
const compaintRouter = express.Router();

const ComplaintController = require("../../controller/complaint");
const checkForRole = require("../../middlewares/role-check");
const validator = require("../../middlewares/validator");
const complaintValidator = require("../../validators/complaint");
const controller = new ComplaintController();

compaintRouter.get("/user", controller.getAllUserComplaints)
compaintRouter.get("/", checkForRole, controller.getAllComplaints);
compaintRouter.get("/:id", controller.getComplaintById);
compaintRouter.post(
  "/",
  complaintValidator.create,
  validator,
  controller.addComplaint
);
compaintRouter.put(
  "/:id",
  complaintValidator.create,
  validator,
  checkForRole,
  controller.updateComplaint
);
compaintRouter.put(
  "/:id/assign",
  complaintValidator.assign,
  validator,
  checkForRole,
  controller.assignComplaint
);
compaintRouter.put(
  "/:id/fix",
  complaintValidator.fix,
  validator,
  checkForRole,
  controller.fixComplaint
);
compaintRouter.put(
  "/details/:id",
  complaintValidator.create,
  validator,
  controller.getComplaintDetail
);

module.exports = compaintRouter;
