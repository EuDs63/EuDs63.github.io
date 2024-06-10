---
title: PostgreSQL学习笔记
date: 2024-05-04T13:13:49+08:00
slug: learn_postgre
tags:
  - 笔记
categories:
  - 学习
summary: 浅尝辄止
---

## 命令
### 连接到PostgreSQL数据库
- 一般环境：`psql -U <your_username> -d <your_database_name> -h {your_hostname}`
  - 注：`-h` 用于指定数据库服务器的主机地址,缺省为localhost

- docker: `docker exec -it <container_name_or_id> psql -U <username> -d <database_name>`

### 查看数据库表
- 显示所有表: `\dt`
- 显示指定表的详细信息： `\d+ <table_name>`

### 导出
- `pg_dump -U <username> -d <database_name> -h <host> -p <port> -f <output_file>`
  - 以上命令导出的备份文件可以使用 pg_restore 工具还原到 PostgreSQL 数据库中：`pg_restore -U <username> -d <database_name> -h <host> -p <port> -f <backup_file>`
- >-s, --schema-only            dump only the schema, no data
- >-t, --table=PATTERN          dump the specified table(s) only

### 杂
- 退出: `\q`
- 帮助: `help`

## Pycharm连接Docker中的数据库
### 法一：

1. **获取数据库容器的IP地址：**
   
   `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <your_postgres_container_name>`
2. **在PyCharm中设置数据库连接：** 打开PyCharm，进入 "View" -> "Tool Windows" -> "Database" 来打开数据库工具窗口。
3. 在数据库工具窗口中，点击左上角的加号 (+)，选择 "Data Source" -> "PostgreSQL"。
4. 在 "Data Source Properties" 对话框中，填写以下信息：
    - Host: 使用第2步中获得的Docker容器的IP地址。
    - Port: 默认情况下，PostgreSQL使用端口5432。
    - Database: 你的数据库名称。
    - User: 你的数据库用户名。
    - Password: 你的数据库密码。

注：我使用以上方法，未成功，在参考[PyCharm：无法连接到Docker容器中的postgres-db](https://www.volcengine.com/theme/5098669-P-7-1)后，使用法二成功连接

### 法二
1. 修改配置，将容器内的端口映射到主机端口，例：
```
# 连接到主机的 16432 端口时，流量将被映射到容器内部的 5432 端口
    ports:
      - "15432:5432"
```
2. 同法一
3. 同法一
4. 同法一，此处的Host为`localhost`,端口为15432

## 参考链接
- [PyCharm：无法连接到Docker容器中的postgres-db](https://www.volcengine.com/theme/5098669-P-7-1)
- [neodb/doc/install-docker.md](https://github.com/neodb-social/neodb/blob/main/doc/install-docker.md)