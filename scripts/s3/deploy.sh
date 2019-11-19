#!/bin/bash

set -e euxo pipefail

if [[ $BUILD_ENV == "prod" ]]; then
  BUCKET=${PROD_BUCKET}
  CDN_DISTRIBUTION_ID=${PROD_CDN_DISTRIBUTION_ID}
elif [[ $BUILD_ENV == "qa" ]]; then
  BUCKET=${QA_BUCKET}
  CDN_DISTRIBUTION_ID=${QA_CDN_DISTRIBUTION_ID}
fi

printf "\n> Syncing build with s3 bucket\n\n"
aws s3 sync $BUILD_DIR/ s3://$BUCKET

printf "\n> Invalidate Cloudfront Cache\n\n"
aws cloudfront create-invalidation --distribution-id $CDN_DISTRIBUTION_ID --paths "/*"
