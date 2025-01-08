CREATE DATABASE `trash_bundle`;

CREATE TABLE `trash_bundle`.`users` (
    `id_user` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
    `email` VARCHAR(1024) NOT NULL ,
    `surname` VARCHAR(512) NOT NULL ,
    `first_name` VARCHAR(512) NOT NULL ,
    `secound_name` VARCHAR(512) NULL ,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `status` ENUM('active','inactive','banned','') NOT NULL DEFAULT 'active' ,
    `role` ENUM('root','administrator','worker','user') NOT NULL DEFAULT 'user' ,
    `password` VARCHAR(2048) NOT NULL ,
    PRIMARY KEY (`id_user`),
    UNIQUE (`email`(1024))) ENGINE = InnoDB;