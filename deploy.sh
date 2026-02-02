#!/bin/bash
set -e
echo "Building image"
docker build -t loadbackend:latest ./back-end
echo "creating containers"
docker-compose up -d
echo "deleting unused images"
docker image prune -f
echo "Done'

