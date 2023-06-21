const errorLogModel = require("../models/errorLogModel");


const errorHandler = async (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    // switch (statusCode) {
    //     case 400:
    //         res.json({ title: 'Validation Error', message: err.message, stackTrace: err.stack });
    //         break;
    //     case 401:
    //         res.json({ title: 'Unauthorized', message: err.message, stackTrace: err.stack });
    //         break;
    //     case 403:
    //         res.json({ title: 'Forbidden', message: err.message, stackTrace: err.stack });
    //         break;
    //     case 404:
    //         res.json({ title: 'Not Found', message: err.message, stackTrace: err.stack });
    //         break;
    //     case 500:
    //         res.json({ title: 'Internal Server Error', message: err.message, stackTrace: err.stack });
    //         break;
    //     default:
    //         res.json({ title: 'Some Error Occured', message: err.message, stackTrace: err.stack });
    //         break;
    // }

    const errorLog = await errorLogModel.create({ 
        status: statusCode,
        message: err.message, 
        stackTrace: err.stack 
    });
    
    res.json({ "error" : errorLog });
};

module.exports = errorHandler;