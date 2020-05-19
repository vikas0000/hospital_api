const Report = require("../../models/report");


exports.status = async (req, res) => {
  try {
    const reports = await Report.find({ status: req.params.status })
      .populate("patient")
      .populate("doctor");

    // Creating object to send back to the user
    let result = {};
    // No of cases that have this status
    result.caseCount = reports.length;
    let ans = [];
    // Fetching doctor name and patient details
    for (let i = 0; i < reports.length; i++) {
      let patient = {};
      patient.name = reports[i].patient.name;
      patient.phone = reports[i].patient.phone;
      ans.push({
        doctor: reports[i].doctor.name,
        patient: patient
      });
    }
    result.report = ans;

    // Return response
    return res.status(200).json({
      success: true,
      body: result
    });
  } catch (error) {
    // Error handling
    return res.status(400).json({
      success: false
    });
  }
};
