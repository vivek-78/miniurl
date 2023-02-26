const express = require("express")
const router = express.Router();

router.get("/:url",(req,res)=>{
    const {url} = req.params;
    console.log(url);
});

export default router;