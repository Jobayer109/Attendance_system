const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("../routes/user");

router.use("/api/v1/users", userRoutes);
router.use("/api/v1", authRoutes);
router.use("/api/v1/auth", authRoutes);

module.exports = router;
