const express = require('express');
const bodyParser = require('body-parser');
const dosenController = require('./Controllers/dosenController');

const app = express();
const PORT = 4000; 

app.use(bodyParser.json());
app.use('/dosen', dosenController);

app.listen(PORT, () => {
  console.log(`Server dosen running at http://localhost:${PORT}`);
});