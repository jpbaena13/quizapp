require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));

// Global routes configuration
app.use(require('./routes/index'));

let renderHTML = path.resolve(__dirname, './public/index.html');
app.get('/', function (req, res) {
  res.sendFile(renderHTML);
});

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;      
  console.log('Database connected');
});

app.listen(process.env.PORT, ()=> {
  console.log(`Validation server running on ${process.env.PORT}...`);
})