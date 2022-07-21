FROM alpine:3.9

ARG VERSION=0.88.1
ARG ARCH=Linux-64bit.tar.gz

ADD https://github.com/gohugoio/hugo/releases/download/v${VERSION}/hugo_${VERSION}_${ARCH}.tar.gz /hugo.tar.gz
RUN tar -zxvf /hugo.tar.gz
RUN /hugo version

COPY . /site
WORKDIR /site
ENTRYPOINT ["/hugo", "serve", "--bind", "0.0.0.0"]
