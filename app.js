const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const fs = require('fs');
const port = process.env.PORT || 3000

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/:id', (req, res) => {
    console.log(req.params)
    fs.exists('data.json', (exists) => {
        if (exists) {
            fs.readFile('data.json', (err, data) => {
                if (err) {
                    console.log(err);
                    res.send('Cannot able to read a file');
                } else {
                    const dataSet = JSON.parse(data);
                    res.send(dataSet[req.params.id]);
                }
            });
        } else {
            res.send('No data found.');
        }
    });
});

app.post('/', (req, res) => {
    console.log(req.body);
    fs.exists('data.json', (exists) => {
        if (exists) {
            fs.readFile('data.json', (err, data) => {
                if (err) {
                    console.log(err);
                    res.send('Cannot able to read a file');
                } else {
                    const dataSet = JSON.parse(data);
                    if (dataSet[req.body.id]) {
                        dataSet[req.body.id].data = req.body;
                    } else {
                        dataSet[req.body.id] = {
                            data: req.body,
                            status: 0
                        };
                    }
                    const json = JSON.stringify(dataSet);
                    fs.writeFile('data.json', json, (err) => {
                        if (err) {
                            console.log(err);
                            res.send('Cannot able to creat a file');
                        }
                        res.send(dataSet[req.body.id].status.toString());
                    });
                }
            });
        } else {
            console.log(req.body);
            const data = {};
            data[req.body.id] = {
                data: req.body,
                status: 0
            };
            const json = JSON.stringify(data);
            fs.writeFile('data.json', json, (err) => {
                if (err) {
                    console.log(err);
                    res.send('Cannot able to creat a file');
                }
                res.send('0');
            });
        }
    });
});

app.put('/:id', (req, res) => {
    console.log();
    fs.exists('data.json', (exists) => {
        if (exists) {
            fs.readFile('data.json', (err, data) => {
                if (err) {
                    console.log(err);
                    res.send('Cannot able to read a file');
                } else {
                    const dataSet = JSON.parse(data);
                    if (dataSet[req.params.id]) {
                        dataSet[req.params.id].status = req.body.status;
                        const json = JSON.stringify(dataSet);
                        fs.writeFile('data.json', json, (err) => {
                            if (err) {
                                console.log(err);
                                res.send('Cannot able to update data');
                            }
                            res.send(dataSet[req.params.id]);
                        });
                    } else {
                        res.send('No data found.');
                    }
                }
            });
        } else {
            res.send('No data found.');
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))