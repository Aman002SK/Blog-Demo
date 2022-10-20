const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");

app.listen(3001);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(morgan("dev"));

const URI =
  "mongodb+srv://aman_356:aman_356@cluster0.lxzed5k.mongodb.net/MyBlog?retryWrites=true&w=majority";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("add-blog", (req, res) => {
  const blog = new Blog({
    title: "my new blog",
    snippet: "about new blog",
    body: "more about my new blog",
  })
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", async (req, res) => {
  const result = await Blog.find();
  res.render("index", { title: "All Blogs", blogs: result });
});
// blogs

app.get("/blogs", async (req, res) => {
  const result = await Blog.find({});
  res.render("index", { title: "All Blogs", blogs: result });
});

//post

app.post("/blogs", (req, res) => {
  console.log(req.body, "reqbody");
  const blog = new Blog(req.body)
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});

app.listen(3000, () => console.log("app running"));
