const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const path = require("path");

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index");
});
//res: hiển thị
//req: nhập liệu từ người dùng
app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(port)