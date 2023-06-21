const mongoos = require('mongoose');

const connectDbs = async () => {
    try {
        // using Mongoose to create a connection to MongoDB
        mongoos.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDbs;