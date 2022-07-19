#!/usr/bin/env bash

ARCH="$(uname -m)"

docker build -t mosiman_site:${ARCH} .
docker tag mosiman_site:${ARCH} mosiman/mosiman_site:${ARCH}

docker login docker.io # will this work for actual docker? I'm using podman.
docker push mosiman/mosiman_site:${ARCH}
