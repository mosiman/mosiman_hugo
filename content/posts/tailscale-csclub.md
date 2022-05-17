---
title: "Tailscale on csclub.uwaterloo.ca via userspace networking"
date: 2021-09-05T12:31:04-04:00
draft: true
---

I have been using Tailscale for at least a few months now (to be honest, can't remember life from before Tailscale) and it is still like magic to me. The power of WireGuard without the hassle? Sign me up. And I did. 

Tailscale's userspace networking mode lets you connect to your Tailscale network from a device that doesn't have access to TUN, like for example, on a csclub.uwaterloo.ca account (due to lack of root).

The following steps are nearly verbatim from [Tailscale on AWS Lambda](https://tailscale.com/kb/1113/aws-lambda/)

1. Create an ephemeral key (saved to a variable `$TAILSCALE_AUTHKEY`)
2. Create a folder for Tailscale to live
3. Download the static binaries for `tailscale` and `tailscaled`
4. Extract the binaries
5. Start the Tailscale daemon with the command: `./tailscaled --tun=userspace-networking --socks5-server=localhost:10027 --socket=/users/d49chan/tailscale/tailscaled.sock`
6. Authenticate with Tailscale via `./tailscale --socket=/users/d49chan/tailscale/tailscaled.sock up --authkey="$TAILSCALE_AUTHKEY" --hostname=hfcs`

I have some services in a `k3s` server I'm running at home that is a part of my Tailscale network. Let's try to access it.

```
d49chan@high-fructose-corn-syrup:~/tailscale/tailscale_1.14.0_amd64$ curl --socks5 localhost:10027 100.127.209.109/gogs
<!DOCTYPE html>
<html>
<head data-suburl="/gogs">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

                <meta name="author" content="Gogs" />
                <meta name="description" content="Gogs is a painless self-hosted Git service" />
                <meta name="keywords" content="go, git, self-hosted, gogs">
...
```

It works! I'm not sure what to do with this newfound power just yet. Just thought it'd be cool :)
