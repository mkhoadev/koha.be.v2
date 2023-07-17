#!/bin/bash

image_name="$1"  # Get the image name from the first command-line argument

if [ -z "$image_name" ]; then
    echo "Please provide the image name as a parameter. Example: ./deploy.sh kayn4539/rev-be"
    exit 1
fi

docker build --platform=linux/amd64 -t "$image_name" .
docker push "$image_name"