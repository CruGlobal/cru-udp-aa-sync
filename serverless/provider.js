'use strict'

const { includes, filter, isEmpty, join } = require('lodash-es')

module.exports = () => {
  if (includes(['staging', 'production'], process.env.ENVIRONMENT)) {
    // Jenkins / deployment
    const required = filter(['ECS_CONFIG', 'PROJECT_NAME', 'ENVIRONMENT'], (key) => {
      return typeof process.env[key] === 'undefined'
    })
    if (!isEmpty(required)) {
      throw new Error('Missing required environment variables (' + join(required, ', ') + ')')
    }
    return '${file(${env:ECS_CONFIG}/ecs/${env:PROJECT_NAME}/sls-${env:ENVIRONMENT}.yml):provider}' // eslint-disable-line
  } else {
    // local development
    return {
      runtime: 'nodejs10.x'
    }
  }
}
