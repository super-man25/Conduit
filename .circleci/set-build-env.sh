#!/bin/bash

set -e

printf "> On $CIRCLE_BRANCH branch \n"

if [[ "$CIRCLE_BRANCH" == "master" ]]; then
  BUILD_ENV="prod"
elif [[ "$CIRCLE_BRANCH" == "develop" ]]; then
  BUILD_ENV="qa"
elif [[ "$CIRCLE_BRANCH" == "demo" ]]; then
  BUILD_ENV="demo"
fi

printf "> Setting BUILD_ENV=${BUILD_ENV} \n"

echo "export BUILD_ENV=${BUILD_ENV}" >> $BASH_ENV
