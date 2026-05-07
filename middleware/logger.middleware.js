import logger from '../util/logger.js';

export default (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};