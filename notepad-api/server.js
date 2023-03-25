const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

const url = "mongodb+srv://exebarry:fjfRH88vD8F7WhDw@cluster0.ar1bl.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url)
client.connect()
    .then((client) => {
        const db = client.db("notepad-database");
        const notepads = db.collection("notepad-collection");

        // notepads.updateMany({}, { $currentDate: { timestamp: true } })
        //     .then((result) => {
        //         console.log(result.modifiedCount + " documents updated");
        //     })
        //     .catch((error) => {
        //         console.error("Error updating documents:", error);
        //     });

        console.log("client connected!")

        app.get("/", async function (req, res) {
            const getNotepads = await notepads.find().toArray();
            console.log(getNotepads);
            res.json(getNotepads);
        });

        app.get("/id", function (req, res) {
            const id = req.query.id;
            res.send("get single notepad " + id)
        });

        app.post("/", async function (req, res) {
            const data = req.body;
            if (data.title === "" || data.content === "") {
                res.send("Please complete the data!")
            }
            else {
                const saveResult = await notepads.insertOne(data);
                res.json(saveResult);
            }
        });

        app.put("/", async function (req, res) {
            const data = req.body;
            if (data._id === "" || data.title === "" || data.content === "") {
                response.send("Missing something!");
                console.log(err)
            }
            else {
                const saveResult = await notepads.findOneAndUpdate(
                    { _id: new ObjectId(data._id) },
                    {
                        $set: {
                            title: data.title,
                            content: data.content,
                            timestamp: new Date()
                        }
                    }
                );
                res.json(saveResult);
            }
        });

        app.delete("/", async function (req, res) {
            const data = req.body;
            const deleteResult = await notepads.deleteOne({ _id: new ObjectId(data._id) });
            res.json(deleteResult);
        });

        app.listen(3001, function () {
            console.log("listening on port 3001");
        });
    })
    .catch((e) => {
        console.error(e)
    })


