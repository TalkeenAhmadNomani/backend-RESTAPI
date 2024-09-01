const express = require("express");
var methodOverride = require('method-override')
const app = express();
const port = 3000;
const path = require ("path");
const {v4: uuidv4} = require('uuid');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");


app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
let posts = [
    {
        id:uuidv4(),
        username: "talkeen Nomani",
        content: " i love to do ccoding "
    },
    {
        id:uuidv4(),
        username: "faraz badar",
        content: " more insterested in research intenrship "
    },
    {
        id:uuidv4(),
        username: "shahin alam",
        content: " to do best in coding and technical filed "
    },
    {
        id:uuidv4(),
        username: "boktiar hussain",
        content: " to do best in cgpa and academics "
    },
    
]
app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
}); 
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});
app.post("/posts", (req, res) => {
    let id = uuidv4();
    let {username , content} = req.body;
    posts.push({id, username , content});
    res.redirect("/posts" );

});
app.patch("/posts/:id",(req, res) => {
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    
    res.redirect("/posts");

});
app.get(("/posts/:id/edit"), (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
    

});
app.delete(("/posts/:id"), (req, res) => {
    let {id} = req.params;
     posts = posts.filter((p) => id !== p.id);
     res.redirect("/posts");
     

})



app.listen(port,() => {
    console.log("app isn lisyrning ");
});

