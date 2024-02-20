const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

mongoose.connect('mongodb+srv://dbcluster.avufavv.mongodb.net/', {
    dbName: 'RestApi',
    user: 'mauricioapazairuri',
    pass: 'QAgIQimwVrZo0cDZ',
}).then(() => {
    console.log('Mongoose connected ...');
});

app.all('/test',(req, res) => {
    //console.log(req.params);
    //res.send(req.params);
    console.log(req.body);
    res.send(req.body);
});

const ProductRoute = require('./Routes/Product.route');

app.use('/products', ProductRoute);

app.use((req,res,next) => {
    // const err = new Error('Not Found');
    // err.status = 404;
    // next(err);
    next(createError(404, 'Not Found'));
});

app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.send({
        error:{
            status : err.status || 500,
            message : err.message
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000 ...');
});