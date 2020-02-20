import express from "express";
import favicon from "serve-favicon";
import path from "path";

import data from "./data/data.json";

const app = express();
const PORT = 3000;

// this is for the public folder on path /. This allows us to serve local static files.
app.use(express.static("public"));

// this is for the images folder on path images. This allows us to serve local static files.
app.use("/images", express.static("images"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// method to use json data
app.use(express.json());

//method to send url encoded data making sure to pass the extended method option.
// app.use(express.urlencoded({extended: true}));



// get some data
app.get("/", (req, res) => {
    // first get the data
    res.json(data);
});




app.get("/item/:id", (req, res, next) => {
    // console log during development to make sure it all works.
    // this is the middle ware that pulls the data.
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    // middle ware that uses the req object.
    console.log(" Request from " + req.originalUrl);
    console.log(" Request type: " + req.method);
    // everything above is middleware.
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

// to chain methods together:
app.route("/item")
    .get( (req, res) => {
         if (req.body.length === 0) throw new Error();
        res.send(" a get request has been made to /item on port: " + PORT);
    })
    .put( (req, res) => {
        res.send(" a put request has been made to /item on port: " + PORT);
    })
    .delete( (req, res) => {
        res.send(" a delete request has been made to /item on port: " + PORT);
    });

// add some new data
/*
JSON Data
    "Hello": "JSON is cool"}
URL Encoded data
    hello=URLEncoded+is+cool
 */

app.post("/newItem", (req, res) => {
    console.log(req.body);
    res.send(req.body);
    // res.send("a post request with /newItem route on port" + PORT)
});

// update some existing data
app.put("/updateItem", (req, res) => {
    res.send("a put request with /updateItem route on port" + PORT)
});

// delete some data
/*
app.delete('/item', (req, res) => {
    res.send("a delete request with /item route on port" + PORT)
});
*/

// error handling function
// express assumes this is an error handling function by passing it the err param.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Red Alert! Red Alert!: " + err.stack);
});

app.listen(PORT, () => {
    console.log("Your server is running on port" + PORT);
    // console.log(data);
});

