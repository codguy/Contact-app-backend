const express = require('express');
const connectDbs = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

connectDbs();
const app = express();

const port = process.env.port || 5000;

app.use(express.json());
app.use("/api/contacts", require('./routes/contactRoutes'));
app.use("/api/user", require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});