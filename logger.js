/*jshint esversion: 6 */
const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create log dir if not exist..
if(!fs.existsSync(logDir)){
  fs.mkdirSync(logDir);
}

const tsFormat = new Date().toLocaleTimeString();

const logger = new (winston.Logger)({
  transports: [
    //colorize the output to the console
    new (winston.transports.Console)({
      level: 'info',
      timestamp: tsFormat,
      colorize: true
    }),
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/results.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: env === 'development' ? 'debug' : 'info',
      json: false
    })
  ]
});

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};
