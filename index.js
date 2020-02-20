import express from "express";
import data from "./data/data";

const app = express();
const PORT = 3000;

// this is for the public folder on path /. This allows us to serve local static files.
app.use(express.static("public"));

// this is for the images folder on path images. This allows us to serve local static files.
app.use("/images", express.static("images"));

// get some data
app.get('/', (req, res) => {
    // first get the data
    res.json(data);
});

app.get("/item/:id", (req, res, next) => {
    // console log during development to make sure it all works.
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    res.send(data[user]);
    next();
}, (req, res) => {
    console.log("Did you get the right data");
});

/*app.get("/images", (req, res) => {
    to redirect to another page.
    res.redirect("http://www.linkedin.com");

     to allow a user to download a file. specify a path in the the () above.
     res.download("images/rocket.jpg");
     this will end the call.
    res.end();
});
*/

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

