import * as file from "./utils/file";
const express = require("express");
// const firebase = require("./utils/firebase");
const mocks = require("./serverMocks");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 4050;

app.use(cors());
app.use(bodyParser.json());

app.get("/workspace", (req, res) => {
    console.log("get workspace");
    res.json(file.getWorkspace());
});

// new workspace
app.delete("/workspace", (req, res) => {
    console.log("reset workspace");

    file.reset();
    res.json({ success: true });
});

app.delete("/method/:current", (req, res) => {
    const { current } = req.params;
    console.log("delete " + current);
    file.deleteMethod(current);
    res.json({ success: true });
});

// update code
app.post("/method/:current", (req, res) => {
    const { current } = req.params;
    const { code, IOs, stats } = req.body;
    console.log("update " + current, code, IOs, stats);

    file.writeMethod(current, code, IOs, stats);

    res.json({ success: true });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
