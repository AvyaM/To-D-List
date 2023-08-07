import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today = new Date();
today = (today.toLocaleDateString("en-US", options));

let newItemLists = [];

app.get("/",(req,res)=>{
        res.render("index.ejs",{
        date: today
    });
});

app.post("/",(req,res)=>{
    let item = req.body["newItem"];
    if(item){
    newItemLists.push(item);
    }
    res.render("index.ejs",{
        date: today,
        task: item,
        list: newItemLists.reverse()
    });
});


app.listen(port,()=>{
    console.log(`Running on port ${port}`);
});