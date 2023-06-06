const express = require("express");
const bodyParser = require("body-parser");


var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/todo");
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://bhuvankumar798:bgExm7oRDzQNhqjY@cluster0.nd73572.mongodb.net/todo";

mongoose.connect(url, (err, db)=>{
  if (err) throw err;
  console.log("Database created!");
//   db.close();
});


const trySchema = new mongoose.Schema({
    name:String
});

const item = mongoose.model("task",trySchema);
// const todo = new item({
//     name: "Create some videos"
// });
// const todo2 = new item({
//     name: "Read some books"
// });
// const todo3 = new item({
//     name: "Go out for running"
// });
// const todo4 = new item({
//     name: "Drive to clean your head"
// });


app.get('/', (req,res)=>{
    item.find({},(err,foundItems)=>{
        if(err){
            console.log(err);
        }else{
            res.render('list', {dayej :foundItems});
        }
    });
});


// todo.save();
// todo2.save();
// todo3.save();
// todo4.save();


app.post('/',(req,res)=>{
    const itemName = req.body.ele1;
    const todo5 = new item({
        name:itemName
    });
    todo5.save();
    res.redirect('/');
})

app.post('/delete', (req,res)=>{
    const checked = req.body.checkbox1;
    item.findByIdAndRemove(checked, function(err){
        if(!err){
            console.log("deleted");
            res.redirect("/");
        }
    })
})


app.listen(8000,function(){
    console.log("server started");
});