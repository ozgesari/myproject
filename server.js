//Install express server
const express = require('express');
const path = require('path');
const cors = require("cors");

const app = express();


const issue2options = {
    origin: '*',
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true,
    preflightContinue:false,
    optionsSuccessStatus: 204,
    maxAge: 3600
  };
app.options('*', cors());

// Serve only the static files form the dist directory
app.use(express.static('./dist/todoapp'));

app.post('/login', cors(issue2options), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/todoapp/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);