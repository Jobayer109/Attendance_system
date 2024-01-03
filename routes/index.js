const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("../routes/user");
const authenticate = require("../middlewares/authenticate");

router.use("/api/v1/users", authenticate, userRoutes);
router.use("/api/v1", authRoutes);
router.use("/api/v1/auth", authRoutes);

module.exports = router;
