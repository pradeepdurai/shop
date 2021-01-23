
const User = require("../Models/user");
exports.signUp = (req, res) => {
    var user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.json(err.message);
        }
        else {
            return res.json({
                fullName : user.first_name+" - "+user.last_name,
                email : user.email,
                id : user._id
            });
        }
    })
}