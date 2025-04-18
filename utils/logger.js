const winston = require('winston')
const morgan = require('morgan')
const config = require('../configurations/config')

// created separate httpLogger because we want to log express request separatly
const httpLogger = winston.createLogger({
    transports: [new winston.transports.File({
        filename: config.get('logger.httpLogFileName'),
        json: true,
        maxsize: config.get('logger.logFileSize'),
        maxFiles: 5,
        colorize: false
    })],
    exitOnError: false
})

// logger to log all other logs type from application to exception
const logger = winston.createLogger({
    transports: [new winston.transports.File({
        filename: config.get('logger.logFileName'),
        json: true,
        maxsize: config.get('logger.logFileSize'),
        colorize: false
    }), new winston.transports.Console({
        level: 'debug',
        json: false,
        colorize: true
    })],
    exceptionHandlers: [new winston.transports.File({
        filename: config.get('logger.exceptionLogFileName'),
        json: true,
        maxsize: config.get('logger.logFileSize'),
        colorize: false
    })

    ],
    exitOnError: false
})

// appender function to use winston file transport
const stream = {
    write: function (message, encoding) {
        httpLogger.info(message)
    }
}

// morgan is used to capture http log
morgan.format('full', config.get('logger.httpLogFormat'))
// wrapper function act as middleware for express
logger.startHttpLogger = function () {
    return morgan('full', {
        stream: stream
    })
}

module.exports = logger
