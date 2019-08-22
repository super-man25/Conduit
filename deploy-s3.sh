#!/bin/bash

BUCKET=$1

printf "\n> Syncing build with s3 bucket\n\n"
aws s3 sync build/ s3://$BUCKET
