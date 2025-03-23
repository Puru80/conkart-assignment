const convict = require('convict')
const path = require('path')

const config = convict({
    logger: {
        httpLogFormat: {
            doc: 'HTTP log format',
            format: String,
            default: ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] | :response-time ms ":referrer" ":user-agent"'
        },
        httpLogFileName: {
            doc: 'HTTP log File name',
            format: String,
            default: 'http.log'
        },
        logFileName: {
            doc: 'Log File name',
            format: String,
            default: 'logs.log'
        },
        exceptionLogFileName: {
            doc: 'Exception log File name',
            format: String,
            default: 'exceptions.log'
        },
        logFileSize: {
            doc: 'logs File Max File size',
            format: Number,
            default: 5242880
        },
        path: {
            doc: 'Holds the Log Path',
            format: String,
            default: './logs/'
        }
    },
})

config.set('logger.httpLogFileName', config.get('logger.path') + config.get('logger.httpLogFileName'))
config.set('logger.logFileName', config.get('logger.path') + config.get('logger.logFileName'))
config.set('logger.exceptionLogFileName', config.get('logger.path') + config.get('logger.exceptionLogFileName'))

// validate
config.validate()

module.exports = config
