var convict = require('convict');
const dotenv = require('dotenv');


dotenv.config();

var config = convict({
  PROXY_PORT: {
    doc: 'The port to proxy',
    format: 'port',
    default: 2015,
    env: 'PROXY_PORT'
  },
  API_PORT: {
    doc: 'The port to api',
    format: 'port',
    default: 2020,
    env: 'API_PORT',
  },
  URL: {
    doc: 'Url',
    format: String,
    default: '',
    env: 'URL',
  }
});


module.exports = config;