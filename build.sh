#!/usr/bin/env bash

set -eux
docker ps

pushd ./compose
#    ./clean-docker.sh || echo "noting to clean"
    docker compose -f postgres.yaml pull
    docker compose -f postgres.yaml up --build --detach
    while ! docker compose -f postgres.yaml exec postgres psql --dbname=demo --username=demo -c "select 'yes' as database_available";
    do   
      echo "wait for database to be ready ..."
      sleep 1
    done
    echo "database is available, try to create tables and generate file schema.rs..."
popd
pushd ./compose
    docker compose -f postgres.yaml stop
popd
pushd ./compose    
    pushd ./keycloak
        docker build --tag keycloak .
    popd
popd
