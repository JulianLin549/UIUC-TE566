const express = require('express');
const bodyParser = require('body-parser');
require('./db/initDB');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./api/api-router'));

app.get('/:else', (req, res) => {
    res.send("No such pass exist.");
})

//handle http server and socket io
const PORT = 3000;

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));