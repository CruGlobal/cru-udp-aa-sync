'use strict'

import rollbar from '../config/rollbar'
import { S3 } from 'aws-sdk'
import SftpClient from 'ssh2-sftp-client'

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const handler = async (lambdaEvent) => {
  try {
    // Get list of files from S3
    const s3 = new S3({ apiVersion: '2006-03-01' })
    const objects = (await s3.listObjectsV2({
      Bucket: process.env.S3_ECID_BUCKET,
      Delimiter: '/'
    }).promise()).Contents

    if (objects.length > 0) {
      // Connect SFTP client to Adobe Analytics ftp site
      const client = new SftpClient()
      await client.connect({
        host: process.env.AA_FTP_HOST,
        port: 22,
        username: process.env.AA_FTP_USER,
        password: process.env.AA_FTP_PASSWORD
      })

      // Upload each object to Adobe Analytics FTP
      await asyncForEach(objects, async ({ Key }) => {
        const filename = Key.replace(/\s+/g, '_')
        // Read file from S3
        const object = await s3.getObject({ Bucket: process.env.S3_ECID_BUCKET, Key }).promise()
        // Write object file to SFTP with .csv extension
        await client.put(object.Body, `${filename}.csv`, { encoding: null, autoClose: true })
        // Sleep for 2 sec, Adobe seemed to have hiccups if fin file was written too quickly
        await (new Promise(resolve => setTimeout(resolve, 5000)))
        // Write empty .fin file to SFTP
        await client.put(Buffer.from([]), `${filename}.fin`, { encoding: null, autoClose: true })
        // Copy S3 object to completed_uploads
        await s3.copyObject({
          Bucket: process.env.S3_ECID_BUCKET,
          CopySource: `${process.env.S3_ECID_BUCKET}/${Key}`,
          Key: `completed_uploads/${Key}`
        }).promise()
        // Remove object
        await s3.deleteObject({ Bucket: process.env.S3_ECID_BUCKET, Key }).promise()
      })

      // Close SFTP client connection
      await client.end()
    }
  } catch (error) {
    rollbar.error('aa-sync error', error)
    throw error
  }
}
