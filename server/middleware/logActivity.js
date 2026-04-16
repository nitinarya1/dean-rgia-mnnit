const ActivityLog = require("../models/ActivityLog");

/**
 * Utility to log admin actions to the database.
 * Silently fails so it never blocks core API operations.
 */
async function logActivity(action, resource, details, req, resourceId = null) {
  try {
    await ActivityLog.create({
      action,
      resource,
      resourceId,
      username: req.admin?.username || "Unknown",
      details,
      ip: req.ip || req.headers["x-forwarded-for"] || "unknown",
    });
  } catch (err) {
    // Never throw — logging should never break the main operation
    console.error("ActivityLog error:", err.message);
  }
}

module.exports = logActivity;
