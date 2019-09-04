'use strict'

import includes from 'lodash/includes'
import Rollbar from 'rollbar'

export default new Rollbar({
  // https://rollbar.com/docs/notifier/rollbar.js/#configuration-reference
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  // Enable rollbar on staging and production
  enabled: includes(['staging', 'production'], process.env.ENVIRONMENT),
  payload: {
    environment: process.env.ENVIRONMENT
  }
})
