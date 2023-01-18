const express = require('express');

const ctrl = require("../../controllers/users")

const { validateBody, authenticate, upload } = require('../../middlewares');

const { signupShema, loginShema } = require("../../models/user")

const router = express.Router();

//signup
router.post("/signup", validateBody(signupShema), ctrl.signup )

router.get("/verify/:verificationCode", ctrl.verify)

//signin
router.post("/login", validateBody(loginShema), ctrl.login)

router.get("/current", authenticate, ctrl.getCurrent)

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)

//logout
router.post("/logout", authenticate, ctrl.logout)

module.exports = router; 