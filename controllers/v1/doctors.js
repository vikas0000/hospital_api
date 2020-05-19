const Doctor = require("../../models/doctor");

exports.register = async (req, res) => {
  try {
    // Create a new doctor account
    const user = await Doctor.create(req.body);
    // Get JWT token
    const token = user.getSignedJwtToken();
    // Return response
    res.status(201).json({
      success: true,
      body: user,
      token,
    });
  } catch (err) {
    // Error handling
    res.status(400).json({
      success: false,
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if email and password is present
    if (!email || !password) {
      return res.status(400).json({ success: false });
    }
    // Get doctor based on input
    const user = await Doctor.findOne({ email: email }).select("+password");
    // Error handling if invalid email
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    // Error handling if invalid password
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    // Get JWT token
    const token = user.getSignedJwtToken();

    // Return response
    res.status(201).json({
      success: true,
      body: user,
      token,
    });
  } catch (err) {
    // Error handling
    res.status(400).json({
      success: false,
    });
  }
};
