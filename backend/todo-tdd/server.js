const app = require('./app');

const PORT = process.env.API_PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, HOSTNAME, () => {
    console.log(`Listen to requests on http://${HOSTNAME}:${PORT} in ${NODE_ENV.toUpperCase()} mode`);
});
