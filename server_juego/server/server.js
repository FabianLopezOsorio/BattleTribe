const express = require('express');
const mongoose = require('mongoose');
const post = require('./routes/api/post');
const mapa = require('./routes/api/mapa');
const actions = require('./routes/api/actions');
const traslado = require('./routes/api/traslado');
const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE, OPTIONS");
    next();
});
app.use(express.json());
app.use('/api/post', post);
app.use('/api/mapa', mapa);
app.use('/api/actions', actions);
app.use('/api/traslado', traslado);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server at port: ${port}`));