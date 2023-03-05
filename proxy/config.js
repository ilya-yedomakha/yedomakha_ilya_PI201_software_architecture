var convict = require('convict');


var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'env',
    env: 'NODE_ENV'
  },
  PROXY_PORT: {
    doc: 'The port to proxy',
    format: 'port',
    env: 'PROXY_PORT'
  },
  API_PORT: {
    doc: 'The port to api',
    format: 'port',
    env: 'API_PORT',
  },
  URL: {
    doc: 'Url',
    format: 'url',
    env: 'URL',
  },
});

var env = config.get('env');
config.loadFile(`./${env}.json`);


module.exports = config;