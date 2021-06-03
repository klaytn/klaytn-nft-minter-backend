#!/bin/bash
DOCKER_CONTAINER_NAME=klaytn_nft_minter
docker pull mariadb
docker run -v$PWD/mariadb:/home/mariadb --name $DOCKER_CONTAINER_NAME -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mariadb mariadb
sleep 10 
docker exec -w /home/mariadb $DOCKER_CONTAINER_NAME /bin/bash setup_mariadb.sh