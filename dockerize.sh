#!/bin/bash

set -e

# Project-specific variables
BUILD_DIR="."
DOCKER_IMAGE="ed-web"
BUILD_COMMAND="yarn build-qa"

# Shared variables
SHOULD_PUSH=$1
DOCKER_ORG="dialexa"
DOCKER_TAG_HASH="$(git rev-parse --abbrev-ref HEAD)-$(git rev-parse --short HEAD)"
DOCKER_TAG_LATEST="latest"
DOCKER_TAG_QA="qa"

# Build project assets
printf "\n> Running: $BUILD_COMMAND\n\n"
$BUILD_COMMAND

# Build docker image
printf "\n> Building Docker Images: $DOCKER_ORG/$DOCKER_IMAGE\n\n"
docker build --no-cache --rm --compress --tag $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_HASH $BUILD_DIR
docker tag $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_HASH $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_LATEST
docker tag $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_HASH $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_QA

# Push docker images
if [[ "$SHOULD_PUSH" != "" && "$SHOULD_PUSH" == true ]]; then
	printf "\n> Pushing Docker Images to Docker Hub: $DOCKER_ORG/$DOCKER_IMAGE\n\n"
	docker push $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_HASH
	docker push $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_LATEST
	docker push $DOCKER_ORG/$DOCKER_IMAGE:$DOCKER_TAG_QA
else
	printf "\n> NOT pushing Docker Images to Docker Hub\n\n"
fi
