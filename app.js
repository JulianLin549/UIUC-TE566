const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db/initDB');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));


app.use('/api', require('./api/api-router'));

app.get('/:else', (req, res) => {
    res.send("No such pass exist.");
})

//handle http server and socket io
const PORT = 4000;

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));