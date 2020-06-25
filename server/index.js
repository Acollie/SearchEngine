const {connect_db,fetch_results,fetch_on_text} = require("./database");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/",(req,res,next)=>{

    fetch_on_text(req.body.text).then(data=>{
        res.json({status:1,response:data})
    }).catch(data=>{
        res.json({status:0})
    })

});


const port = process.env.PORT || 4000;
app.listen(port, () => {

    console.log(`listening on ${port}`);
});
