const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const connectDatabase = require('./config/database');


const app = express();
app.use(express.json());

connectDatabase();

app.use('/todos', todoRoutes.router);

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});

module.exports = app;
