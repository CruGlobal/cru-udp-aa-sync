# Cru UDP / Adobe Analytics

Cru User Data Platform / Adobe Analytics placement sync (λ functions)
This repo contains a single lambda function that runs on a schedule and copies CSV files created by the UPD pipeline to Adobe Analytics customer attributes FTP server.

## Requirements
* NodeJS >= 10

## Installation
Clone the repository and install dependencies:
```bash
git clone git@github.com:CruGlobal/cru-udp-aa-sync.git
cd cru-udp-aa-sync
yarn
```

Create `.env` file and add any ENV overrides ([defaults](https://github.com/CruGlobal/cru-udp-aa-sync/blob/master/serverless/environment.js))
* S3_ECID_BUCKET: s3 bucket name where UDP saves ecid placement CSV files
* AA_FTP_HOST: Adobe Analytics sftp hostname
* AA_FTP_USER: Adobe Analytics sftp username
* AA_FTP_PASSWORD: Adobe Analytics sftp password
