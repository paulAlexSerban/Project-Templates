const mongoose = require('mongoose');
const DB_URL = process.env.DB_LOCAL_URI || process.env.DB_URI;

const connectDatabase = async () => {
 try {
    const con = await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('Connected to database');
    // console.log(`MongoDB Database connected with host: ${con.connection.host}`);
    return con;
 }
    catch (err) {
        console.error('Entered catch block'); // Debugging line
        console.error('Error connecting to database', err);
        return null;
    }
};

module.exports = connectDatabase;

