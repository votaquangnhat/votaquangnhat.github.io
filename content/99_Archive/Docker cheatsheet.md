---
title: Docker cheatsheet
draft: true
date: 2025-10-29 15:12:10 +0700
tags:
  - comsci
---
```bash
docker ps
docker ps -a
docker images
docker pull <image_name>
docker run <image_name> # pull image if it has not been in the local yet
docker run -d <image_name>
docker run <image_name>:<version>
docker run -p<host_port>:<container_port>

docker stop <container_id>
docker start <container_id>

docker logs <container_id>
docker exec -it <container_id> /bin/bash

docker network ls
docker network create <name>

docker-compose -f file.yaml up
docker-compose -f file.yaml down

docker build -t my-app:1.0 <directory of the Dockerfile>
```