process.env.NODE_ENV = "test";

const app = require("../server");
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const http = require("chai-http");
chai.use(http);
const Doctor = require("../models/doctor");
const Patient = require("../models/patients");
const Report = require("../models/report");
let token = "";
let patient_id = "";

describe("Doctor registration", () => {
  //mock valid user input
  const new_user = {
    name: "Arun",
    email: "arun@gmail.com",
    password: "password",
  };

  before((done) => {
    // Reset database
    Doctor.remove({}, (err) => {
      if (err) console.log(err);
    });
    Patient.remove({}, (err) => {
      if (err) console.log(err);
    });
    Doctor.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });

  it("Should return 201 and confirmation after creating a Doctor account", (done) => {
    //send request to the app
    chai
      .request(app)
      .post("/api/v1/doctors/register")
      .send(new_user)
      .then((res) => {
        //assertions
        expect(res).to.have.status(201);
        res.body.should.have.property("token");
        token = res.body.token;
        done();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  it("Should return 400 if doctor already exists", (done) => {
    //send request to the app
    chai
      .request(app)
      .post("/api/v1/doctors/register")
      .send(new_user)
      .then((res) => {
        //assertions
        expect(res).to.have.status(400);
        done();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});

describe("Patient registration", () => {
  //mock valid user input
  const new_patient = {
    name: "John",
    phone: "123456",
  };

  it("Should return 201 after creating a patient account", (done) => {
    //send request to the app
    chai
      .request(app)
      .post("/api/v1/register_patient")
      .set("Authorization", "Bearer " + token)
      .send(new_patient)
      .then((res) => {
        //assertions
        patient_id = res.body.body._id;
        expect(res).to.have.status(201);
        done();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});

describe("Create a report", () => {
  //mock valid user input
  const report = {
    status: "Symptoms-Quarantine",
  };

  it("Should return 201 after creating a patient report", (done) => {
    //send request to the app
    chai
      .request(app)
      .post(`/api/v1/patients/${patient_id}/create_report`)
      .set("Authorization", "Bearer " + token)
      .send(report)
      .then((res) => {
        //assertions
        expect(res).to.have.status(201);
        done();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});

describe("Return all reports of a user", () => {
  it("Should return 200 after fetching all reports of a patient", (done) => {
    //send request to the app
    chai
      .request(app)
      .get(`/api/v1/patients/${patient_id}/all_reports`)
      .then((res) => {
        //assertions
        expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});

describe("Return all reports based on a status", () => {
  const status = "negative";
  it("Should return 200 after fetching all reports based on a status", (done) => {
    //send request to the app
    chai
      .request(app)
      .get(`/api/v1/reports/${status}`)
      .then((res) => {
        //assertions
        expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});
