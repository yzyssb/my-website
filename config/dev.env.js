'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST:'"/api"'
  // API_HOST:'"http://192.168.1.76:8082"'
  // API_HOST:'"http://192.168.1.76:8082"'
})
