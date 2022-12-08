const express = require('express');
const cookieParser = require('cookie-parser');
const {engine} = require('express-handlebars');
const {homeRouter} = require("./routes/home");
const {configuratorRouter} = require("./routes/configurator");
const {orderRouter} = require("./routes/order");
const {handlebarsHelpers} = require("./utils/handlebars-helpers");


const app = express();

app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');
app.set('views', './views');
// app.use(express.json); /* nie potrzebny na tym etapie, sprawdź czy działa bez ()*/
app.use(express.static('public'));
app.use(cookieParser()); // bez () zawiesza wczytywanie strony

app.use('/', homeRouter);
app.use('/configurator', configuratorRouter);
app.use('/order', orderRouter);


app.listen(3000,);