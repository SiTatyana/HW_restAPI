const express = require('express');

const ctrl = require("../../controllers/users")

const { validateBody, authenticate } = require('../../middlewares');

const { signupShema, loginShema } = require("../../models/user")

const router = express.Router();

//signup
router.post("/signup", validateBody(signupShema), ctrl.signup )


//signin
router.post("/login", validateBody(loginShema), ctrl.login )

router.get("/current", authenticate, ctrl.getCurrent)

//logout
router.post("/logout", authenticate, ctrl.logout)

module.exports = router;