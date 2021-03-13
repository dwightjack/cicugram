const db = require('./lib/dev-db.json');
const swPlugin = require('./sw-plugin.js');
const dbResponse = JSON.stringify(db);

/**
 * @type {import('polka').Middleware}
 */
function apiMiddleware(req, res, next) {
  if (!req.path.includes('/api/')) {
    next();
    return;
  }

  setTimeout(() => {
    res.setHeader('content-type', 'application/json');
    res.end(dbResponse);
  }, Math.floor(Math.random() * 1000));
}
/**
 *
 * @param {import('wmr').Options} config
 */
module.exports = async function (config) {
  if (config.mode === 'start') {
    // we need to disable compression because
    // apiMiddleware is not working with it :'(
    config.compress = false;
    config.middleware.push(apiMiddleware);
  }
  swPlugin(config);
};
