CREATE DATABASE klaytn_nft CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'klaytn_nft'@'%' IDENTIFIED BY 'klaytn_nft@';
GRANT ALL PRIVILEGES ON klaytn_nft.* to 'klaytn_nft'@'%';
FLUSH PRIVILEGES;
exit