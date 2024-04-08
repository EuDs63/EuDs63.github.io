---
title: Mysql常用命令
date: 2024-04-04T13:12:49+08:00
slug: mysql_cheatsheet
tags:
  - 笔记
categories:
  - 学习
summary: a cheatsheet of mysql
---

## 登录 
- `sudo mysql -u root -p` 
- 注：
  - 首次安装完成后，直接回车即可
  - `-p` 提示用户输入密码
  - `-h` 指定要连接的主机名或IP地址

## 修改原始密码
- `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by 'my-secret-password';`

## 重置密码
- 场景：忘记了已设置的密码
- 步骤:
  1. `sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf`
  2. 添加 `skip-grant-tables`
  3. 重启mysql：`service mysql restart`
  4. 登录 `mysql`
  5. `FLUSH PRIVILEGES;`
  6. `ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';`
  7. 再次修改`/etc/mysql/mysql.conf.d/mysqld.cnf`,将`skip-grant-tables`注释掉

## 新增用户
- `CREATE USER '新用户名'@'域名' IDENTIFIED BY '密码';`
- 注：如果无`IDENTIFIED BY '密码'`,则不会设置密码

## 权限
- 赋予权限: `GRANT CREATE,SELECT ON database_name.* TO 'username'@'domain';`
- 赋予所有权限：`GRANT ALL PRIVILEGES ON *.* TO 'keanu'@'%' WITH GRANT OPTION;`
- 撤销权限: `REVOKE INSERT ON database_name.* FROM 'username'@'domain';`

## Host 'xxx.xx.xxx.xxx' is not allowed to connect to this MySQL server 
- `GRANT ALL PRIVILEGES ON *.* TO '用户名'@'%' WITH GRANT OPTION;`
- 参考[Host 'xxx.xx.xxx.xxx' is not allowed to connect to this MySQL server - Stack Overflow](https://stackoverflow.com/questions/1559955/host-xxx-xx-xxx-xxx-is-not-allowed-to-connect-to-this-mysql-server)

## linux - How to bind MySQL server to more than one IP address
- `sudo sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mysql/mysql.conf.d/mysqld.cnf`
- 参考[linux - How to bind MySQL server to more than one IP address? - Server Fault](https://serverfault.com/questions/139323/how-to-bind-mysql-server-to-more-than-one-ip-address/139324#139324)

## sql mode
1. 查看当前模式: `SELECT @@sql_mode;`
2. 更改配置: `SET PERSIST sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`
3. 注：
   - 直接修改，类似`set sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'`，重启后配置会还原
   - 报错：`Access denied for user 'root'@'localhost' (using password: YES)`,权限不够，改为在root用户下执行即可。

## 查看
- 配置: `sudo cat /etc/mysql/mysql.conf.d/mysqld.cnf`
- 当前用户: `select user();`
- 数据库： `show databases;`
- 表： `show tables;`