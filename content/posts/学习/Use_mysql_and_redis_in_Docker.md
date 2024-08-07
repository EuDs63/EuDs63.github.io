---
title: Use mysql and redis in Docker
date: 2024-07-13T13:13:49+08:00
slug: mysql_redis_in_one_docker
tags:
  - 笔记
  - docker
categories:
  - 学习
summary: docker-compose is awesome
---
## Docker 
1. View running containers
`docker ps`

2. View all containers
`docker ps -a`
  
3. View container configuration
`docker inspect container-name`

4. View container logs
`docker logs container-name`

5. Display all images
`docker image ls`
  
6. Remove a container
`docker rm container-name`

7. Remove an image
`docker rmi imagename`

8. removes any unused containers
`docker system prune -a`

9. removes any unused volumes
`docker volume prune`

### docker-compose
**cd into the directory where contains docker-compose.yml first!**
- `docker-compose up -d`
- `docker-compose down`

---

## Mysql
- You can then connect to the server using `mysql`, just as you connect to any Mysql instance: `mysql -h ip -u username -p`
- If you don’t have mysql installed locally, you can run it from the Docker container: `docker exec -it mysql_container bash`
- check version: `mysql> SELECT VERSION();`

---

## Redis
- If you **have** redis-cli installed locally,you can then connect to the server using `redis-cli`, just as you connect to any Redis instance: `redis-cli -h ip -a <password>`
  - To specify a different host name or an IP address, use the`-h`option
  - To set a different port, use`-p`
  - `-a` <password>
- If you **don’t have** redis-cli installed locally, you can run it from the Docker container: `$ docker exec -it redis_container bash`
- check server info: `info server`
- check module: `module list`

---

## docker-compose.yml 
```docker-compose.yml 
services:
  mysql:
    image: mysql:latest
    container_name: mysql_container
    environment:
      MYSQL_ROOT_PASSWORD: <password>
      MYSQL_DATABASE: database_name
      MYSQL_USER: username
      MYSQL_PASSWORD: <password>
    ports:
      - "3306:3306"
    command: --default-authentication-plugin=mysql_native_password --bind-address=0.0.0.0
    volumes:
      - mysql_data:/var/lib/mysql
    restart: always

  redis:
    image: redis/redis-stack:latest
    container_name: redis_container
    command: ["redis-stack-server", "--requirepass", "<password>", "--bind", "0.0.0.0"]
    ports:
      - "6379:6379"
      - "8001:8001"  # RedisInsight web UI 默认端口
    volumes:
      - redis_data:/data
    restart: always

volumes:
  mysql_data:
  redis_data:
```

## 踩坑 
- [redisBloom commands don't work · Issue #2081 · redis/go-redis](https://github.com/redis/go-redis/issues/2081 )
  
  换用redis-stack即可

## Reference
- [mysql - Official Image | Docker Hub](https://hub.docker.com/_/mysql )
- [How to Create a MySql Instance with Docker Compose | by Chris Chuck | Medium](https://medium.com/@chrischuck35/how-to-create-a-mysql-instance-with-docker-compose-1598f3cc1bee )
- [Redis CLI | Docs](https://redis.io/docs/latest/develop/connect/cli/ )
- [redis/redis-stack - Docker Image | Docker Hub](https://hub.docker.com/r/redis/redis-stack )