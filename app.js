const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const path = require("path");

const mongoose = require("mongoose");
const studentModel = require("./models/StudentSchema");
const url = "mongodb://localhost:27017/greenwich";
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connect to db success !");
    }
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index");
});
//res: hiển thị
//req: nhập liệu từ người dùng
app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/student", (req, res) => {
    //SQL: select * from student
    studentModel.find((err, data) => {
        if (err) {
            console.log(err);
        } else {
            //1. Show dữ liệu ra console log
            //console.log(data)
            //2. show dữ liệu ra web bằng "send "
            //res.send(data);
            //3. show dữ liệu ra view bằng "render"
            res.render("student", { student: data });
        }
    });
});

app.listen(port);