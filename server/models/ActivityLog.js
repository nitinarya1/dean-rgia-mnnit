const mongoose = require("mongoose");

/**
 * ActivityLog model — tracks all admin create/update/delete actions.
 * Used for audit trail and security monitoring.
 */
const activityLogSchema = new mongoose.Schema({
  action: { type: String, required: true },       // e.g. "CREATE", "UPDATE", "DELETE"
  resource: { type: String, required: true },     // e.g. "Dean", "Announcement"
  resourceId: { type: String },                   // MongoDB _id of affected document
  username: { type: String, default: "Admin" },
  details: { type: String },                      // Human readable summary
  ip: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("ActivityLog", activityLogSchema);
