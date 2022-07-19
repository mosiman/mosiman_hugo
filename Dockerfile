FROM alpine:3.9

ARG VERSION=0.88.1

ADD https://github.com/gohugoio/hugo/releases/download/v${VERSION}/hugo_${VERSION}_Linux-64bit.tar.gz /hugo.tar.gz
RUN tar -zxvf /hugo.tar.gz
RUN /hugo version

COPY . /site
WORKDIR /site
ENTRYPOINT ["/hugo", "serve", "--bind", "0.0.0.0"]
