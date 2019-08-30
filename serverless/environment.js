'use strict'

module.exports = () => {
  // Use dotenv to load local development overrides
  require('dotenv').config()
  return {
    ENVIRONMENT: process.env.ENVIRONMENT || 'development',
    ROLLBAR_ACCESS_TOKEN: process.env.ROLLBAR_ACCESS_TOKEN || '',
    S3_ECID_BUCKET: process.env.S3_ECID_BUCKET || 'bucket',
    AA_FTP_HOST: process.env.AA_FTP_HOST || 'ftp.example.com',
    AA_FTP_USER: process.env.AA_FTP_USER || 'username',
    AA_FTP_PASSWORD: process.env.AA_FTP_PASSWORD || 'password'
  }
}
