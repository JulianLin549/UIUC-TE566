const request = require('request');
const express = require('express');
const app = express();
var url = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-B0046-001?Authorization=CWB-71FAC1BF-0109-4609-9301-B145041EE020&format=JSON';

app.get('/', (req, res) => {

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
            dataString = obj.cwbopendata.dataset.contents.content;
            dataArray = dataString.split(",").map(Number).map(dataPoint => {
                if (dataPoint == -99) {
                    return 0;
                }
                return dataPoint
            });
            const newArr = [];
            while (dataArray.length) newArr.push(dataArray.splice(0, 75));
            console.log(newArr);
            return
        }
    }, res.send("hello"));
})

const PORT = 3000;

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

