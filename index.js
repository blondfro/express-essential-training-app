import express from "express";
import data from "./data/data";

const app = express();
const PORT = 3000;

// get some data
app.get('/', (req, res) => {
    // first get the data
    res.json(data);
});

// add some new data
app.post('/newItem', (req, res) => {
    res.send("a post request with /newItem route on port" + PORT)
});

// update some existing data
app.put('/updateItem', (req, res) => {
    res.send("a put request with /updateItem route on port" + PORT)
});

// delete some data
app.delete('/item', (req, res) => {
    res.send("a delete request with /item route on port" + PORT)
});

app.listen(PORT, () => {
    console.log("Your server is running on port" + PORT);
    console.log(data);
});

