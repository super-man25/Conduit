#!/bin/bash

printf "\n> Syncing build with s3 bucket\n\n"
aws s3 sync build/ s3://qa.eventdynamic.com
