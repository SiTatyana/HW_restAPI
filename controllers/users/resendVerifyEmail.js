const {User} = require("../../models/user")

const {HttpError, sendEmail} = require("../../helpers")

const resendVerifyEmail = async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(400,"Missing required field email")
    }
    if(user.verify) {
        throw HttpError(400,"Verification has already been passed")
    }

    const verifyEmail = {
        to: email,
        subject: "Verify your email",
        html:`<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}">Click verify email</a> `,
    }
    
    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent"
    })
}
module.exports = resendVerifyEmail;