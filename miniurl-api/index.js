import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express(); 
const port = 9000;
const corsOptions ={
    origin:`http://localhost:3000`, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose.set("strictQuery", false); 
mongoose.connect(process.env.MONOGO_CONNECT)
import {model,Schema} from "mongoose";

const urlSchema = new Schema({
    urlCode:String,
    urlName:String
})
const urlModel = model("url",urlSchema);
app.post("/createUrl",async(req,res)=>{
    const urlName = req.body.url;
    const fetchedUrl = await urlModel.findOne({ urlName:urlName },{ _id:0,urlCode:1,urlName:1 });
    if(!fetchedUrl){ 
     const urlCode = new Date().getTime().toString(36) + Math.random().toString(36).slice(10)
     urlModel.create({
         urlCode,
         urlName:urlName
     })
     res.send("registered a new url\nhttp://localhost:9000/"+urlCode);
    }else{
    res.send("fetched directly\nhttp://localhost:9000/"+fetchedUrl.urlCode);
   }
   console.log(res.statusCode);
 })
app.get("/:urlCode",async(req,res)=>{
    const {urlCode} = req.params;
    const fetchedUrl = await urlModel.findOne({ urlCode },{ urlName:1 });
    if(!fetchedUrl){
        return res.send("invalid url");
    }
    console.log(req.hostname);
    res.redirect(fetchedUrl.urlName)
});

app.listen(9000,()=>{
    console.log("port is running on",port);
}); 

/*
app.get("/",async(req,res)=>{
   const urlName = req.body.url;
   const fetchedUrl = await urlModel.findOne({ urlName:urlName },{ _id:0,urlCode:1,urlName:1 });
   if(!fetchedUrl){ 
    const urlCode = new Date().getTime().toString(36) + Math.random().toString(36).slice(10)
    urlModel.create({
        urlCode,
        urlName:urlName
    })
    res.send("registered a new url\nhttp://localhost:9000/"+urlCode);
   }else{
   res.send("fetched directly\nhttp://localhost:9000/"+fetchedUrl.urlCode);
  }
  console.log(res.statusCode);
})
*/