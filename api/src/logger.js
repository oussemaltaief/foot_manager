const { createLogger, format, transports, addColors } = require('winston');

const API_LEVELS = {
  levels: {
    info: 0,
    warning: 0,
    error: 0,
    notification: 0,
    debug: 1
  },
  colors: {
    info: 'inverse bold magenta',
    warning: 'inverse bold yellow',
    error: 'inverse bold red',
    notification: 'inverse bold blue'
  }
};

// Configure the Winston logger. For the complete documentation seee https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  levels: API_LEVELS.levels,
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.json(),
    format.splat(),
    format.simple()
  ),
  transports: [new transports.Console()]
});

addColors(API_LEVELS.colors);

module.exports = logger;
