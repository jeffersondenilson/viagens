const router = require("express").Router();
const passport = require("passport");
require("../config/passport")(passport);

const auth = require("../controllers/auth");

router.post("/auth/signup", auth.signup);
router.post("/auth/signin", auth.signin);
router.post("/auth/validatetoken", auth.validateToken);

// router.use(passport.authenticate("jwt", { session: false }));

module.exports = router;
