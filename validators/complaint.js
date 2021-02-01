const { body } = require("express-validator");
const { StatusEnum } = require("../constants");

const complaintValidator = {
  create: [
    body("deviceModel").isLength({ min: 3, max: 50 }),
    body("manufacturer").isLength({ min: 2, max: 15 }),
    body("problemSummary").optional(),
    body("description").optional(),
    body("logfilePath").optional()
  ],
  assign: [
    body("assignedTo").notEmpty(),
    body("status").notEmpty()
    .custom((val, {req}) => {
      if(!StatusEnum.some(st => st === val)){
        return Promise.reject('Please provide valid status');
      } 
      return Promise.resolve();
    })
  ],
  fix: [
    body("fixDescription").notEmpty(),
    body("assignedTo").notEmpty()
  ]
};

module.exports = complaintValidator;
