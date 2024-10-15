#!/usr/bin/env bash

set -e

TAG=romanaschned/frontend

docker build --tag=$TAG --file=docker/Dockerfile .

docker buildx build --platform linux/amd64 --file docker/Dockerfile --tag $TAG .

docker push $TAG
