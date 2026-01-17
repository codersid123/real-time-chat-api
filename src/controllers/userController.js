const User = require("../models/User");

exports.getMe = async (req, res) => {
  try {
    //req.user.id comes from auth middleware
    const user = await User.findById(req.user.id).select("-password");
    //("-password") hides password

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
