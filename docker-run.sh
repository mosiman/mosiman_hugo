#!/usr/bin/env bash

ARCH=$(uname -m)

docker run -p 1313:1313 docker.io/mosiman/mosiman_site:$ARCH
