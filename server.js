require("dotenv").config();

const express = require("express");
const routes = require("./routes/");
const http = require("http").Server(app);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("client/build"));
app.use(routes);

http.listen(PORT, function () {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});

module.exports.app = app;