const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const employeeScheme = new Schema({ firstName: String, lastName: String, employmentDate: Date }, { versionKey: false });
const Employee = mongoose.model("Employee", employeeScheme);

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://127.0.0.1:27017/employeesdb", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(3000, function () {
            console.log("Сервер ожидает подключения...");
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/api/employees", function (req, res) {
    Employee.find({})
        .then(employees => {
            res.send(employees);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/api/employees/:id", function(req, res){
    const id = req.params.id;
    Employee.findOne({_id: id})
        .then(function(employee){
            res.send(employee);
        })
        .catch(function(err){
            console.log(err);
        });
});

app.post("/api/employees", jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
  
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const employmentDate = req.body.employmentDate;
    const employee = new Employee({ firstName: firstName, lastName: lastName, employmentDate: employmentDate });
  
    employee.save()
      .then((employee) => {
        res.send(employee);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });

app.delete("/api/employees/:id", function (req, res) {

    const id = req.params.id;
    Employee.findByIdAndDelete(id).then(employee => {
        res.send(employee);
    })
        .catch(err => {
            return console.log(err);
        });
});

app.put("/api/employees", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const employmentDate = req.body.employmentDate;
    const newEmployee = { firstName: firstName, lastName: lastName, employmentDate: employmentDate };

    Employee.findOneAndUpdate({ _id: id }, newEmployee, { new: true })
        .then(employee => {
            res.send(employee);
        })
        .catch(err => {
            return console.log(err);
        });
});