#!/bin/bash
DOCKER_CONTAINER_NAME=klaytn_nft_minter
docker stop $DOCKER_CONTAINER_NAME
docker rm $DOCKER_CONTAINER_NAME