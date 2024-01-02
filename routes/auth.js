const router = require("express").Router();
const {
  registerController,
  loginController,
  homeController,
  privateController,
} = require("../controllers/authControl");
const authenticate = require("../middlewares/authenticate");

router.get("/", homeController);
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/private", authenticate, privateController);

module.exports = router;
