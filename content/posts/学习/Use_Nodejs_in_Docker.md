---
title: Use_Nodejs_in_Docker
date: 2024-07-17T13:13:49+08:00
slug: Use_Nodejs_in_Docker
tags:
  - 笔记
  - docker
categories:
  - 学习
summary: docker-compose is awesome
---
## 需求
1. 在nas的docker运行我的node项目 
2. 使用`docker compose up -d`来启动 
3. 首次运行时，它将先执行`npm install`,然后 `npx prisma generate`,最后是`node --env-file=.env bin/www`
4. 非首次运行，则直接执行`node --env-file=.env bin/www`
5. 出错时不立即退出，而是可以进入容器中
6. 将代码每天从某台电脑同步到nas中
7. docker能感应到代码的变化

## 对docker中运行的node项目debug 
- `node --env-file=.env --inspect-brk=0.0.0.0 bin/www`
- 默认的端口号是"`9229`,记得publish端口`- "9229:9229"`
- 在[chrome://inspect/#devices](chrome://inspect/#devices) 对 Target discovery settings进行设置：`ip:92229`

## Promblem & Solution
- [node.js - Bus Error when running npm run dev || npm start - Stack Overflow](https://stackoverflow.com/questions/73022976/bus-error-when-running-npm-run-dev-npm-start )
- [node.js - bcrypt invalid elf header when running node app - Stack Overflow](https://stackoverflow.com/questions/15809611/bcrypt-invalid-elf-header-when-running-node-app )
- [Docker Compose - How to execute multiple commands? - Stack Overflow](https://stackoverflow.com/questions/30063907/docker-compose-how-to-execute-multiple-commands )
- [ubuntu 16.04 - pull access denied repository does not exist or may require docker login - Stack Overflow](https://stackoverflow.com/questions/48719921/pull-access-denied-repository-does-not-exist-or-may-require-docker-login )

## Dockerfile + compose.yml 
`compose.yml`示例:
```bash 
services:
  server:
    build:
      context: .
      target: dev
```
定义了一个名为 `server` 的服务，并且指定了如何构建该服务的 Docker 镜像。
- `build` 指令表明这个服务需要从当前目录（`.`）构建镜像，而不是从 Docker Hub 上拉取现成的镜像。
- `context: .` 指示 `docker-compose` 使用当前目录作为构建上下文。这意味着 `docker-compose` 会将当前目录中的所有文件和目录传递给 Dockerfile。
- `target: dev` 指示 `docker-compose` 使用 Dockerfile 中名为 `dev` 的构建阶段。Dockerfile 支持多阶段构建，每个阶段定义一个构建目标。使用 `target` 指令可以指定使用哪个构建阶段。

后面我放弃了这样的组合，因为Dockerfile写起来总是有些问题，我一时找不到解决方法。

更关键的是：我并不需要将构建好的镜像上传到其他地方。我在nas上使用docker，最主要的是为了docker所提供的纯净环境。

最后我的选择还是用`compose.yml`来做

## compose.yml 示例 
```bash 
services:
  backend:
    container_name: backend-container
    image: node:20
    working_dir: /app
    volumes:
      - ./:/app
    # if you want to keep the container running and debug, you can use the following command
    #command: tail -f /dev/null
    # then use docker exec -it backend-container bash
    command: ["sh", "-c", "if [ ! -d 'node_modules' ]; then npm install && npx prisma generate; fi && node --env-file=.env bin/www"]
    ports:
      - "3000:3000"
      - "9229:9229"
    environment:
      - NODE_ENV=development
    restart: unless-stopped
    tty: true
```

## 参考
- [node - Official Image | Docker Hub](https://hub.docker.com/_/node )
- [Node.js — Debugging Node.js](https://nodejs.org/en/learn/getting-started/debugging )
- [Compose Build Specification | Docker Docs](https://docs.docker.com/compose/compose-file/build/ )
- [Containerize a Node.js application | Docker Docs](https://docs.docker.com/language/nodejs/containerize/ )
- [node.js - Bus Error when running npm run dev || npm start - Stack Overflow](https://stackoverflow.com/questions/73022976/bus-error-when-running-npm-run-dev-npm-start )
- [node.js - bcrypt invalid elf header when running node app - Stack Overflow](https://stackoverflow.com/questions/15809611/bcrypt-invalid-elf-header-when-running-node-app )
- [Docker Compose - How to execute multiple commands? - Stack Overflow](https://stackoverflow.com/questions/30063907/docker-compose-how-to-execute-multiple-commands )
- [ubuntu 16.04 - pull access denied repository does not exist or may require docker login - Stack Overflow](https://stackoverflow.com/questions/48719921/pull-access-denied-repository-does-not-exist-or-may-require-docker-login )