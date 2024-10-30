---
title: Redis学习笔记
slug: learn_redis
date: 2024-05-30T15:34:14+08:00
tags:
  - 笔记
categories:
  - 学习
summary: 无快不破
--- 

## 安装脚本 
```bash
# #!/bin/bash

# install redis-stack-server
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis-stack-server

# setup
echo "setup redis"
sudo echo "requirepass your_password" >> /etc/redis-stack.conf
sudo echo "bind 0.0.0.0" >> /etc/redis-stack.conf

# restart
sudo service redis-stack-server start
```

---

## 登录 
`redis-cli -h hostname -a password`

---

## Use redis in Docker 
详见[Use mysql and redis in Docker | EuDs's Blog](https://ds63.eu.org/2024/mysql_redis_in_one_docker/#redis )

---

## pub sub 
- `PUBSUB CHANNELS [pattern]`
- 作用： Lists the currently active channels.(An active channel is a Pub/Sub channel with one or more subscribers (excluding clients subscribed to patterns).)
- 补充：我曾犯过这样一个错误，`UNSUBSCRIBE channel1`,然后发现`PUBSUB CHANNELS`还是有它,就在那纳闷，好一会才反应过来，可能这个channel还有其他被监听的地方。

### 参考
- [Understanding Pub/Sub in Redis (Getting Started) | Redis with Raphael De Lio](https://medium.com/redis-with-raphael-de-lio/understanding-pub-sub-in-redis-18278440c2a9 )
- [PUBSUB CHANNELS | Docs](https://redis.io/docs/latest/commands/pubsub-channels/ )

---

## List
- [Redis lists | Docs](https://redis.io/docs/latest/develop/data-types/lists/ )
- `lpop`
- LPUSH adds a new element to the head of a list; RPUSH adds to the tail.
- LPOP removes and returns an element from the head of a list; RPOP does the same but from the tails of a list.
- LLEN returns the length of a list.
- LMOVE atomically moves elements from one list to another.
- LRANGE extracts a range of elements from a list.
- LTRIM reduces a list to the specified range of elements.
