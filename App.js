const exp = require('express');
const hbs = require('hbs');
const fs = require('fs');

const Port = process.env.PORT || 3001;

const app = exp();

let logger = (req) => {
    let time = new Date().toTimeString();
    let log = `${time}: ${req.method} | ${req.url} \n`
    console.log(log);
    return log;
};

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('thisYear',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('upper', (text) => {
    return String(text).toUpperCase();
});

app.use((req, res, next) => {
    let log = logger(req);
    fs.appendFile('log.txt',log + "\n",(err) => {
        if (err) {
            console.log("An error happened :"+err);
        }
    });
    next();
});

app.use(exp.static(__dirname + '/public'));

let homeData = {
    title: 'Home'
};

let aboutData = {
    title: 'About Page',
    name: 'Mosi'
};

let proData = {
    title: "Pro Page"
};

app.get('/', (req, res) => {
    res.render('home.hbs', homeData);
});

app.get('/about', (req, res) => {
    res.render('about.hbs', aboutData);
});

app.get('/pro', (req, res) => {
    res.render('pro.hbs', proData);
});

app.get('/posts', (req, res) => {
    res.json([
        {id: 1, title: "title 1", body: "body 1"},
        {id: 2, title: "title 2", body: "body 2"},
        {id: 3, title: "title 3", body: "body 3"},
        {id: 4, title: "title 4", body: "body 4"},
        {id: 5, title: "title 5", body: "body 5"}
    ]);
});

app.get('/posts/1', (req, res) => {
    res.json(
        {id: 1, title: "title 1", body: "body 1"}
        );
});

app.get('/posts/2', (req, res) => {
    res.json(
        {id: 1, title: "title 2", body: "body 2"}
    );
});

app.get('/posts/3', (req, res) => {
    res.json(
        {id: 1, title: "title 3", body: "body 3"}
    );
});

app.get('/posts/4', (req, res) => {
    res.json(
        {id: 1, title: "title 4", body: "body 4"}
    );
});

app.get('/posts/5', (req, res) => {
    res.json(
        {id: 5, title: "title 5", body: "body 5"}
    );
});

app.listen(Port, () => {
    console.log(`Server is up on port: ${Port}`);
});