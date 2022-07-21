#!/usr/bin/env bash

ARCH="$(uname -m)"

if [ "$ARCH" == "x86_64" ]; then
    DOCKER_ARCH="Linux-64bit"
elif [ "$ARCH" == "aarch64" ]; then
    DOCKER_ARCH="Linux-ARM64"
else
    echo "Architecture $ARCH not accounted for"
    exit 1
fi

docker build --build-arg ARCH=$DOCKER_ARCH -t mosiman_site:${ARCH} .
docker tag mosiman_site:${ARCH} mosiman/mosiman_site:${ARCH}

docker login docker.io # will this work for actual docker? I'm using podman.
docker push mosiman/mosiman_site:${ARCH}
