const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const { User } = require("../../models/user");

const { HttpError, sendEmail } = require("../../helpers");

const signup = async(req, res) => {
   const {email, password} = req.body;

const user = await User.findOne({email});
if(user) {
    throw HttpError(409, "Email in use")
}

const hashPassword = await bcrypt.hash(password,10)
const avatarURL = gravatar.url(email);
const verificationCode = uuidv4();

const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationCode});

const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html:`<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationCode}">Click verify email</a> `,
}

await sendEmail(verifyEmail);

res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.enum,
    
})

}

module.exports = signup;