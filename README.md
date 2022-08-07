# WHATSBRQ EXT

The main base code for WhatsBrq chrome extention webapp (backend + frontend).

# Versions

#### NodeJS: v16.15.0

#### npm: v8.5.5

# HOW TO RUN IN DEVELOPMENT ENVIROMENT

1.  Run the following command to install frontend webapp deps `npm run client-install`
2.  After installation done, install server deps using the following command `npm run server-install`
3.  Run server first using `npm run server`
4.  once the server is running, start react app (website) using the following command `npm run client` in new terminal. choose yes for running in another port as port 3000 will be used by server.

#### DATEBASE - MYSQL

1. create database

CREATE DATABASE `whatsBrq` /_!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci _/ /_!80016 DEFAULT ENCRYPTION='N' _/;

1. Create tables

- create users table

`CREATE TABLE`users`( `id`int NOT NULL AUTO_INCREMENT, `FullName`varchar(200) NOT NULL, `email`varchar(200) NOT NULL, `phone`varchar(20) NOT NULL, `role`varchar(10) NOT NULL, `password`varchar(255) NOT NULL, `code`varchar(45) NOT NULL, `isPhoneVerified`int NOT NULL DEFAULT '0', `referrer` varchar(155) DEFAULT NULL, PRIMARY KEY (`id`) ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3; `

- create userPlan Table

`CREATE TABLE `userPlan`( `id`int NOT NULL AUTO_INCREMENT, `userId`int NOT NULL, `planType`varchar(10) NOT NULL, `PlanExpireDate`date DEFAULT NULL, `planStatus`varchar(10) NOT NULL, `totalUsedMessage` int NOT NULL DEFAULT '0', PRIMARY KEY (`id`), KEY `UserIdIndex` (`userId`), CONSTRAINT `userID` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;`

2. insert data into tables

- inster into users

INSERT INTO `users`
(`id`,
`FullName`,
`email`,
`phone`,
`role`,
`password`,
`code`,
`isPhoneVerified`,
`referrer`)
VALUES
(1,
"Mubarak",
"akoma919@gmail.com",
"966509336310",
"admin",
"$2b$10$dS3tZ7e9STGCtGcCYcK3aucA.X9.3FYETShD84T7ADM1jZA8FTd.a",
"Cv1-Vxvk6",
1,
null),(2,
"Ebrahim",
"pro.ikp@gmail.com",
"601121368977",
"user",
"$2b$10$dS3tZ7e9STGCtGcCYcK3aucA.X9.3FYETShD84T7ADM1jZA8FTd.a",
"Mv1-Vxss7",
1,
null);

- insert into userPlan

INSERT INTO `userPlan`
(`id`,
`userId`,
`planType`,
`PlanExpireDate`,
`planStatus`,
`totalUsedMessage`)
VALUES
(1,
1,
"Free",
"2022-08-13",
"active",
0),(2,
2,
"Free",
"2022-08-13",
"active",
0);
