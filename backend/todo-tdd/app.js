const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const app = express();

app.use(express.json());

app.use('/todos', todoRoutes.router);

app.get('/', (req, res) => {
    res.json('Hello World');
});

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

const server = app.listen(PORT, HOSTNAME, () => {
  console.log(`Listen to requests on http://${HOSTNAME}:${PORT}`);
});

module.exports = app;
