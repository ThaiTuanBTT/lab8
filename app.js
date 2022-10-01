//module
const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const path = require("path");

//database connect + access
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

//body-parser: get input from FORM
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//render ra form nhập liệu
app.get("/add", (req, res) => {
    res.render("add")
});

//nhận và xử lý dữ liệu từ form add
app.post("/add", (req, res) => {
    //console.log(req.body);
    //res.send(req.body);
    // res.render("output", {
    //     student: req.body
    // });
    //tạo object student chứa dữ liệu nhập từ form
    var student = new studentModel({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        image: req.body.image,
    });
    //lưu object student vào database
    student.save((err) => {
        if (err) {
            if (err) {
                console.error(err);
            } else {
                res.redirect("/student")
            }
        }
    })
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

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var check = false;
    if (username == "admin" && password == "123456") {
        check = "Login succed !";
    }
    //res.send(check)
    res.render("check", { result: check });
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