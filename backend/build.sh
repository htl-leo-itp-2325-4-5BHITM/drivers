#!/usr/bin/env bash

set -e

TAG=ghcr.io/htl-leo-itp-2325-4-5bhitm/drivus-backend

docker build --tag=$TAG .

docker push $TAG