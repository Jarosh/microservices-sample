FROM ubuntu:xenial
MAINTAINER Jaroslav Shkarupilo <jshkarupilo@gmail.com>
ENV DEBIAN_FRONTEND noninteractive

RUN \
    apt-get update && \
    apt-get install -y curl nginx

RUN \ 
    curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN \ 
    apt-get update && \
    apt-get -y install nodejs

RUN \
    npm config set strict-ssl false && \
	npm update -g

RUN mkdir /app

EXPOSE 8080
