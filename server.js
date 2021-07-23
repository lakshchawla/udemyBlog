const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

var posts = [];

app.get("/", (req, res) => {
    res.render("main", {
        posts: posts
    });
});

app.get("/new-post", (req, res) => {
    res.render("compose");
})

app.post("/new-post", (req, res) => {

    var post = {
        title: req.body.Title,
        blogPost: req.body.BlogPost,
        authorName: req.body.AuthorName,
        authorEmail: req.body.Email,
        link: _.lowerCase(req.body.Title)
    }

    posts.push(post);

    console.log(_.lowerCase(post.title));

    res.redirect('/');
})

app.get("/posts/:reqSite", (req, res) => {
    posts.forEach(post => {
        if (req.params.reqSite === post.link) {
            res.render("post", {
                post: post
            })
        }
    });
})

app.listen("3000", () => {
    console.log('Server running on port 3000');
})