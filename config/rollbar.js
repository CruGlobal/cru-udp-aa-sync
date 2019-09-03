'use strict'

import { includes } from 'lodash-es'
import Rollbar from 'rollbar'

module.exports = new Rollbar({
  // https://rollbar.com/docs/notifier/rollbar.js/#configuration-reference
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  // Enable rollbar on staging and production
  enabled: includes(['staging', 'production'], process.env.ENVIRONMENT),
  payload: {
    environment: process.env.ENVIRONMENT
  }
})
