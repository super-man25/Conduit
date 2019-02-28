#!/bin/bash

set -e

DOCKER_TAG_ENV=$2

# Check for valid environments
if [ "$DOCKER_TAG_ENV" != "qa" ] && [ "$DOCKER_TAG_ENV" != "prod" ] && [ "$DOCKER_TAG_ENV" != "demo" ]
then
	echo "Please provide 'qa', 'prod', or 'demo' as the second argument"
	exit
fi

# Project-specific variables
BUILD_DIR="."
DOCKER_IMAGE="ed-web"
BUILD_COMMAND="yarn build-$DOCKER_TAG_ENV"

# Shared variables
SHOULD_PUSH=$1
DOCKER_ORG="dialexa"
DOCKER_TAG_HASH="$(git rev-parse --abbrev-ref HEAD)-$(git rev-parse --short HEAD)"

# Build project assets
printf "\n> Running: $BUILD_COMMAND\n\n"
$BUILD_COMMAND

# Build docker image
printf "\n> Building Docker Images: $DOCKER_ORG/$DOCKER_IMAGE\n\n"
docker build --no-cache --rm --compress --tag $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_HASH $BUILD_DIR
docker tag $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_HASH $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_ENV

# Push docker images
if [[ "$SHOULD_PUSH" != "" && "$SHOULD_PUSH" == true ]]; then
	printf "\n> Pushing Docker Images to Docker Hub: $DOCKER_ORG/$DOCKER_IMAGE\n\n"
	docker push $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_HASH
	docker push $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_ENV
else
	printf "\n> NOT pushing Docker Images to Docker Hub\n\n"
fi
