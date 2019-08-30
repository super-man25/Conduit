#!/bin/bash

BUCKET=$1
CDN_DISTRIBUTION_ID=$2

printf "\n> Syncing build with s3 bucket\n\n"
aws s3 sync build/ s3://$BUCKET

printf "\n> Invalidate Cloudfront Cache\n\n"
aws cloudfront create-invalidation --distribution-id $CDN_DISTRIBUTION_ID --paths "/*"
