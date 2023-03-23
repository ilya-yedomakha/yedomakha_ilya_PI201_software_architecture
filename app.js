const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/", { useUnifiedTopology: true });

let dbClient;

app.use(express.static(__dirname + "/public"));


mongoClient.connect().then(mongoClient => {
    dbClient = mongoClient;
    app.locals.collection = dbClient.db("employeesdb").collection("employees");
    app.listen(3000, function () {
        console.log("Сервер очікує підключення...");
    });
});

app.get("/api/employees", function (req, res) {

    const collection = req.app.locals.collection;
    collection.find().toArray().then((employees) => {
        res.json(employees)
    }).catch((err) => console.log(err));

});

app.get("/api/employees/:id", function (req, res) {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;

    collection.findOne({ _id: id })
        .then(employee => {
            res.send(employee);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/api/employees", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const employmentDate = req.body.employmentDate;
    const employee = { firstName: firstName, lastName: lastName, employmentDate: employmentDate };

    const collection = req.app.locals.collection;

    collection.insertOne(employee)
        .then(result => {
            res.send(employee);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.delete("/api/employees/:id", function (req, res) {

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;

    collection.findOneAndDelete({ _id: id })
        .then(result => {
            let employee = result.value;
            res.send(employee);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error deleting employee");
        });
});

app.put("/api/employees", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const employmentDate = req.body.employmentDate;

    const collection = req.app.locals.collection;

    collection.findOneAndUpdate({ _id: id }, { $set: { firstName: firstName, lastName: lastName, employmentDate: employmentDate } },
        { returnOriginal: false })
        .then(result => {
            const employee = result.value;
            res.send(employee);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error updating employee");
        });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});