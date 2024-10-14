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
```bash
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
- resart(重启策略)
| 重启策略              | 重启条件                   | 适用场景                                      |
| --------------------- | -------------------------- | --------------------------------------------- |
| `restart: always`     | 容器退出时，无论正常或异常 | 始终运行的容器，例如数据库、消息队列          |
| `restart: on-failure` | 容器以非零退出代码退出时   | 处理业务逻辑的容器，例如 Web 服务器、API 服务 |
| `unless-stopped`      | 容器在停止之前会一直运行   |                                               |

## docker-compose up的四种写法
1. 传统写法：cd到`compose.yml`所在文件夹位置，再`docker-compose up`
2. 使用绝对路径: `docker-compose -f /home/user/project/docker-compose.yml up`
3. 使用别名: `alias project-up="docker-compose -f /home/user/project/docker-compose.yml up` (别名还可以用中文名)
4. 

## 在群晖上使用docker
- [紧急！解决Docker镜像无法拉取问题！ - 承心识梦](https://www.cxaim.com/591.html )
- [为群晖 Container Manager 配置代理 | 柴语言 · ChaiLang](https://blog.chai.ac.cn/posts/docker-proxy )
- [群晖 Docker 服务使用心得 - CodeSky 代码之空](https://www.codesky.me/archives/nas-docker.wind )
- [NAS系统折腾记 | 设置科学上网环境 - HY's Blog](https://blog.yanghong.dev/nas-clash-vpn/ )
- [群晖 NAS - 代理设置 | Darren's Blog](https://www.odszz.com/posts/nas-proxy/ )
- [群晖 Docker 的迷惑配置 - 晨鹤部落格](https://chenhe.me/post/synology-docker-configuration )
- [群晖Non-Root非特权账户执行Docker指令 - 兮陌](https://www.simaek.com/archives/467/ )
```bash 
#创建群组并分配用户：
sudo synogroup --add docker
sudo synogroup --memberadd docker <username1> <username2> ...
sudo synogroup --get docker
#更改docker权限：
sudo chgrp docker /var/run/docker.sock
```
- 报错: `/usr/local/bin/docker-compose: line 1: Not: command not found`
  - 我之前在群晖上使用`docker-compose`都很正常，但某天突然报以上错误。一开始一头雾水，但尝试去找这个文件，发现并不存在。那问题就转变成如果在群晖上安装`docker-compose`了，搜到[原来，群晖也能用 Docker Compose！ - 初之音](https://www.himiku.com/archives/docker-compose-for-synology-nas.html )这篇，摘抄命令如下
```bash 
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
sh -c "curl -L https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > $DOCKER_CONFIG/cli-plugins/docker-compose"
# or 
sh -c "curl -L https://mirror.ghproxy.com/https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > $DOCKER_CONFIG/cli-plugins/docker-compose"
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
```

## 容器逃逸
- [容器逃逸常用方法-云社区-华为云](https://bbs.huaweicloud.com/blogs/278683)
- [CVE-2024-21626 从容器内逃逸到宿主机文件系统 | 卡瓦邦噶！](https://www.kawabangga.com/posts/5785)

## 原理
- [Docker (容器) 的原理 | 卡瓦邦噶！](https://www.kawabangga.com/posts/4224)

## 搭建私有docker仓库
- [搭建私有docker仓库](https://blog.fatedier.com/2016/05/16/install-private-docker-registry/ )

## 时间线
### 2023年5月18日
Docker官方仓库域名被墙，国内已无法正常访问。

### 2024年6月8日
这几天国内不少镜像站被关停了,唉

### 2024年7月12日 
- [docker 容器内使用宿主机的代理配置 | Zach Ke's Notes](https://kebingzao.com/2019/02/22/docker-container-proxy/ )
- [如何为终端、docker 和容器设置代理 | Moralok](https://www.moralok.com/2023/06/13/how-to-configure-proxy-for-terminal-docker-and-container/ )

## 2024年8月11日
- [Recent Docker BuildKit Features You're Missing Out On | Martin Heinz | Personal Website & Blog](https://martinheinz.dev/blog/111 )
  - `docker buildx debug`

## 参考链接
- [如何更新docker容器镜像](https://blog.minirplus.com/12138/)
- [官方镜像加速](https://help.aliyun.com/document_detail/60750.htm)
- [Docker Container 代理配置一本通](https://anthonysun256.github.io/docker-proxy-complete-solution/)
- [docker run --rm 选项详解](https://blog.csdn.net/qq_34939308/article/details/105202336)
- [利用代理拉取docker镜像 | 学习笔记](https://blog.haohtml.com/archives/31298)