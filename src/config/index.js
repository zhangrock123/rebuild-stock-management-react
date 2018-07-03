const CONFIG = {
  development: {
    apiHost: 'http://www.goorder.net/stockmanagement'
  },
  staging: {
    apiHost: 'http://www.goorder.net/stockmanagement'
  },
  production: {
    apiHost: 'http://www.goorder.net/stockmanagement'
  }
};

module.exports = CONFIG[process.env.NODE_ENV || 'development'];
