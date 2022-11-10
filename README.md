# Branch name will be changed

We will change the `master` branch to `main` on Nov 1, 2022.
After the branch policy change, please check your local or forked repository settings.

# Klip NFT Minter - Backend
---

# WARNING
This tool provides features of log-in and minting via Klip, but the minted NFT tokens will not be shown in Klip.
To be shown them in Klip, please consult klip-partners@groundx.xyz.
# Getting Started

## Setting up MariaDB

This backend uses MariaDB as a database. To setup MariaDB, please execute the command below:

```
$ ./create_mariadb.sh

# To re-run stopped container, use this command:
$ ./start_mariadb.sh
```

This command pulls MariaDB docker image and runs it on your local machine.
Please make sure that docker has been installed on your machine.


## Setup AWS credential
This backend uploads json objects and images to AWS s3.
Please setup your AWS credential by executing the following command:

```
$ aws configure
```

To install `aws`, please refer to [AWS Command Line Interface](https://aws.amazon.com/cli/).

## Installing Packages

Install packages that this repo depends on.

```
$ npm install
```

## Setting up .env

`.env` is the file having all the environment variables for the backend.

```
$ cp .env.template .env
```

The below table shows the description of each variable in `.env.template`.
Make the values appropriately.

| Variable | Description | Default value |
|---|---|---|
| EXPRESS_PORT | The listening port of this backend server | 4500 |
| DATABASE | The database name for this backend. If you run `./run_mariadb.sh`, the database `klip_nft` has been created. See [setup_mariadb.sql](./mariadb/setup_mariadb.sql). | klip_nft |
| DB_USERNAME | The username of the database. If you run `./run_mariadb.sh`, the username has been set as "klip_nft". See [setup_mariadb.sql](./mariadb/setup_mariadb.sql). | klip_nft |
| DB_PASSWORD | The password of the database. If you run `./run_mariadb.sh`, the password has been set as "klip_nft@". See [setup_mariadb.sql](./mariadb/setup_mariadb.sql). | klip_nft@ |
| SYNC_DB | If it is 1, tables for the database is synchronized as in the [models](./models). At the first run, make sure leave this 1 so that it creates tables for the backend. Please make it 0 after the table creation. | 1 |
| KAS_CHAIN_ID | The chain ID of the Klaytn network when using KAS. The chain IDs of Cypress and Baobab are 8217 and 1001, respectively. | 8217 |
| KAS_AUTHORIZATION | The KAS authorization header. This value can be obtained in [KAS credential](https://console.klaytnapi.com/en/security/credential). | Basic XXX |
| KAS_ACCESS_KEY | The KAS access key. This value can be obtained in [KAS credential](https://console.klaytnapi.com/en/security/credential). | XXX |
| KAS_SECRET_ACCESS_KEY | The KAS secret access key. This value can be obtained in [KAS credential](https://console.klaytnapi.com/en/security/credential). | XXX |
| CONTRACT_ADDRESS |  KIP-17 contract address. The value must be properly set. Please refer to the previous section - "Deploying KIP-17 using KAS". | 0xd307d6a43afa6635427358b3c21bfc095cbb1bf6 |
| CORS_DOMAINS | The comma-separated domain list for CORS (Cross-Origin Resource Sharing). Please put your frontend domain here. | http://localhost:3000 |

## Deploying KIP-17 contract using KAS

Using [Klaytn API Service (KAS)](https://console.klaytnapi.com), you can easily deploy a KIP-17 smart contract.
Later, you can use the smart contract for NFT minting.

Visit https://console.klaytnapi.com/en/service/kip17/cont/list, and click the "Create Contract" Button.

The deployed contract address must be set to `.env` as in CONTRACT_ADDRESS.

```
// file .env
CONTRACT_ADDRESS=0xd307d6a43afa6635427358b3c21bfc095cbb1bf6
```
## Running the Backend Server

Finally, you can run your backend server using the following command:

```
$ npm run start
```

Now, the backend server is ready to go. Let's move to [Klaytn NFT Minter - Frontend](https://github.com/klaytn/klaytn-nft-minter-frontend).

## Stopping MariaDB

If you want to stop the MariaDB docker, please execute the following command.
This command will stop the docker container.
```
$ ./stop_mariadb.sh

# You can re-run the maria db, run the command below:
$ ./start_mariadb.sh
```
## Terminating MariaDB

If you want to terminate the MariaDB docker, please execute the following command.
This command will stop and remove the docker container.
**WARNING** By removing the docker container, data in the MariaDB will be REMOVED together.

```
$ ./destroy_mariadb.sh
```
