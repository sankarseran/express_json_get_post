const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const fs = require('fs');
const port = process.env.PORT || 3000

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/:id', (req, res) => {
    console.log(req.params)
    fs.exists('data.json', (exists) => {
        if (exists) {
            fs.readFile('data.json', (err, data) => {
                if (err){
                    console.log(err);
                    res.status(400).send('Cannot able to read a file');
                } else {
                    const dataSet = JSON.parse(data); 
                    res.send(dataSet[req.params.id]);
                }
            });
        } else {
            res.status(400).send('No data found.');
        }
    });
});

app.post('/', (req, res) => {
    // console.log(req.body);
    fs.exists('data.json', (exists) => {
        if (exists) {
            fs.readFile('data.json', (err, data) => {
                if (err){
                    console.log(err);
                    res.status(400).send('Cannot able to read a file');
                } else {
                    const dataSet = JSON.parse(data); 
                    dataSet[req.body.id] = req.body;
                    const json = JSON.stringify(dataSet); 
                    fs.writeFile('data.json', json, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send('Cannot able to creat a file');
                        }
                        res.send('Successfully added.');
                    });
                }
            });
        } else {
            // console.log(req.body);
            const data = {};
            data[req.body.id] = req.body;
            const json = JSON.stringify(data);
            fs.writeFile('data.json', json, (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('Cannot able to creat a file');
                }
                res.send('Successfully added.');
            });
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
