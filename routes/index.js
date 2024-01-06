const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("../routes/user");
const authenticate = require("../middlewares/authenticate");
const adminAttendanceRoutes = require("../routes/admin-attendance");

router.use("/api/v1", authRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", authenticate, userRoutes);
router.use("/api/v1/admin", authenticate, adminAttendanceRoutes);

module.exports = router;
