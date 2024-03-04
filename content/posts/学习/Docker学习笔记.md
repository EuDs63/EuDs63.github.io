---
title: Docker学习笔记
slug: learn_docker
date: 2023-03-25T15:34:14+08:00
tags:
  - 笔记
  - docker
categories:
  - 学习
summary: docker pull learn
---
## 命令
  ```docker
  # build并tag
  docker build -t imagename .

  # 将build好的image上传到docker hub
  docker login -u $username
  docker tag $imagename $username/$imagename
  docker push $username/$imagename

  # 查看运行的container
  docker ps
  
  # 查看所有的container
  docker ps -a
  
  # 查看container的配置情况
  docker inspect container-name

  # 直接获取目标容器的启动参数

  docker run --rm -v /var/run/docker.sock:/var/run/docker.sock assaflavie/runlike target-container-name

  # 可将上述命令设置别名
  alias drunlike="docker run --rm -v /var/run/docker.sock:/var/run/docker.sock assaflavie/runlike"

  # 查看容器的日志
  docker logs container-name

  # 显示所有的镜像
  docker image ls
  
  # 删除容器
  docker rm container-name

  # 删除镜像
  docker rmi imagename

  # 退出容器后自动删除
  docker run --rm  $imagename

  # 为用户添加docker用户组权限
  sudo usermod -aG docker your-username
  newgrp docker 

  ```

## Dockerfile配置
- 代理设置
  - 让镜像构建过程也走代理：
    ```
    ENV http_proxy=http://172.17.0.1:7890
    ENV https_proxy=http://172.17.0.1:7890
    ```
- dockerignore
  新建文件.dockerignore，写入需要忽略的文件，

  在Dockerfile中添加一行
  `COPY .dockerignore .`

## docker-compose.yml配置
- 代理设置
  - 让容器走代理
    ```
    environment:
      - http_proxy=http://172.17.0.1:7890
      - https_proxy=http://172.17.0.1:7890
    ```
- volume挂载
  例：
  注：此处所挂载的文件位置与docker-compose.yml文件同级
  ```
    volumes:
      - "./config.json:/app/config.json"
      - "./save.json:/app/save.json"
      - "./warning.json:/app/warning.json"
  ```

## 2023年5月18日
Docker官方仓库域名被墙，国内已无法正常访问。

## 容器逃逸
- [容器逃逸常用方法-云社区-华为云](https://bbs.huaweicloud.com/blogs/278683)

## 原理
- [Docker (容器) 的原理 | 卡瓦邦噶！](https://www.kawabangga.com/posts/4224)

## 参考链接
- [如何更新docker容器镜像](https://blog.minirplus.com/12138/)
- [官方镜像加速](https://help.aliyun.com/document_detail/60750.htm)
- [Docker Container 代理配置一本通](https://anthonysun256.github.io/docker-proxy-complete-solution/)
- [docker run --rm 选项详解](https://blog.csdn.net/qq_34939308/article/details/105202336)
- [利用代理拉取docker镜像 | 学习笔记](https://blog.haohtml.com/archives/31298)