const doctor1 = require("../../models/doctor");

module.exports.userRegister = function(req, res) {
  
    // Create account
    const user = doctor1.create(req.body);
    // Get JWT token
    const token = user.getSignedJwtToken();
    // Return response
    res.status(201).json({
      success: true,
      body: user,
      token,
    });
};


module.exports.userLogin = function (req, res){
 
    const { userEmail, userPassword } = req.body;
    // Check for email and password 
    if (!userEmail || !userPassword) {

      return res.status(400).json({ 
        success: false 
      });
    }
    // Get the email
    const findUser = doctor1.findOne({ userEmail: userEmail }).select("+userPassword");
    // check the email status
    if (!findUser) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid details" 
      });
    }

    // check for matching password or not
    const isMatched = user.matchPassword(userPassword);
    // chedk for password validation
    if (!isMatched) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid details" 
      });
    }
  
    const token = user.getSignedJwtToken();

    // Return response
    res.status(201).json({
      success: true,
      body: user,
      token,
    });
 
};
