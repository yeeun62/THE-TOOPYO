const http = require("http");
const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors())

app.get('/', cors(),function(req, res, next){
    res.json({msg:"hello world!"})
})

http.createServer(app).listen(80,function () {
	console.log("Hello world");
});