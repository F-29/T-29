const exp = require('express');
const hbs = require('hbs');
const fs = require('fs');

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

app.get('/', (req, res) => {
    res.render('home.hbs', homeData);
});

let aboutData = {
    title: 'About Page',
    name: 'Mosi'
};

app.get('/about', (req, res) => {
    res.render('about.hbs', aboutData);
});

app.listen(8080);