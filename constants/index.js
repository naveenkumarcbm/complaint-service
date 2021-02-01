const StatusEnum = [0, 1, 2];
const StatusMap = {
  0: "Initiated",
  1: "In-Progress",
  2: "Fulfilled"
};
const RolesEnum = [0, 1, 2];
const RolesMap = {
  0: "Admin",
  1: "Agent",
  2: "General User"
};

const Messages = {
  USER_NOT_FOUND: 'User not found.',
  INVALID_PWD: "User or password is invalid.",
}
module.exports = {
  StatusEnum,
  StatusMap,
  RolesEnum,
  RolesMap,
  Messages
};
