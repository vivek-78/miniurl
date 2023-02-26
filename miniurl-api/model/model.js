import mongoose from "mongoose";
mongoose.set("strictQuery", false); 
mongoose.connect(process.env.MONOGO_CONNECT)
import {model,Schema} from "mongoose";
const urlSchema = new Schema({
    urlCode:String,
    urlName:String
});
const UrlModel = model("url",urlSchema);
export default UrlModel;