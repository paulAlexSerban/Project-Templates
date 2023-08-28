const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const app = express();

app.use(express.json());

app.use('/todos', todoRoutes.router);

app.get('/', (req, res) => {
    res.json('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
