---
title: “一本好书”部署记录
date: 2023-10-30T00:50:12+08:00
lastmod: 2023-10-30T00:50:12+08:00
tags:
  - 记录
  - web
categories:
  - 学习
summary: 记录"一本好书"部署的过程
---
## 说明
- 前端仓库地址： [BookRecommend_Front](https://github.com/EuDs63/BookRecommend_Front)
- 后端仓库地址[BookRecommend_Back](https://github.com/EuDs63/BookRecommend_Back)

## MySQL
1. 安装
   [MySQL :: A Quick Guide to Using the MySQL APT Repository](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/)
   `systemctl status mysql`
2. 登录 `mysql -u root -p`
3. 建表
```mysql
show databases;
CREATE DATABASE book_recommend;
USE book_recommend;
source /path/to/your_script.sql; #建库脚本
show tables;
describe table_name;
```

## Flask

### 设置生产服务器
1. 安装Gunicorn `pip install gunicorn`
2. 安装相关依赖 `pip install -r requirements.txt`
3. 测试运行`gunicorn -w 4 -b 127.0.0.1:5000 'app:app' --access-logfile=-` (显示日志)
4. 测试成功后
```bash
mkdir logs
# 后台运行，日志输出在文件中
gunicorn -w 4 -b 127.0.0.1:5000 'app:app' --access-logfile=logs/access.log --error-logfile=logs/error.log --daemon
# 查看进程
pgrep gunicorn
# 关闭进程
pkill gunicorn
```

## React 
1. 打包 `npm run build`
2. nginx操作
```bash
sudo vim /etc/nginx/sites-available/book_recommend
#粘贴以下配置
server {
    listen 80;
    server_name ip_address;  # 使用服务器的 IP 地址
    root /usr/local/project/bookrecommend/dist;  # 静态文件所在的目录

    location / {
        try_files $uri /index.html;
    }
}

# 创建一个符号链接以启用配置文件
sudo ln -s /etc/nginx/sites-available/book_recommend /etc/nginx/sites-enabled/
# 检查 Nginx 配置以确保没有语法错误：
sudo nginx -t
# 重启 Nginx 以使配置生效
sudo service nginx restart
```
   
## 收获
### `0.0.0.0`与` 127.0.0.1`的区别
1. `-b 0.0.0.0` 意味着绑定到所有可用的网络接口，可以通过任何 IP 地址访问。这使得应用程序对外可见，可以通过服务器的公共 IP 地址或域名进行访问。

2. 而`-b 127.0.0.1` 意味着仅绑定到本地回环接口（localhost，IP 地址 127.0.0.1），这样只有本地访问能够连接到您的 Flask 应用程序。外部网络请求无法直接访问。

## 参考连接
1. [生产部署 — Flask中文文档(2.3.x)](https://dormousehole.readthedocs.io/en/latest/deploying/index.html) 
2. [Gunicorn — Flask中文文档(2.3.x)](https://dormousehole.readthedocs.io/en/latest/deploying/gunicorn.html)