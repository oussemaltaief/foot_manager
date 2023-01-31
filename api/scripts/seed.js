/* eslint-disable no-console */
const path = require('path');
const chalk = require('chalk');

const app = require('../src/app');
const logger = require('../src/logger');

if (process.argv.length < 3) {
  logger.warning('Usage: node seed.js <data file>');
  process.exit(1);
}

logger.notification(chalk.bold('Started seeding . . .'));

const data = require(path.join(process.cwd(), process.argv[2]));

const promises = Object.keys(data).reduce((promises, serviceName) => {
  const service = app.api.service(serviceName);

  promises.push(
    service
      .remove(null)
      .then(() =>
        Promise.all(data[serviceName].map(item => service.create(item)))
      )
      .then(result =>
        logger.info(chalk.cyan.bold(`${result.length} ${serviceName} added`))
      )
  );

  return promises;
}, []);

Promise.all(promises)
  .then(() => {
    logger.notification(chalk.greenBright('Done seeding!'));
    process.exit();
  })
  .catch(err => {
    logger.error(err);
    process.exit(1);
  });
