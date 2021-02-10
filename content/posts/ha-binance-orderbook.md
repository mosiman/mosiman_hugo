---
title: HA scraping of Binance order book deltas
date: 2021-02-10
categories:
- Programming
tags:
- Crypto trading
- Binance
---

Based on the current Binance API, there is no way to retrieve historical orderbook deltas, or even historical order books at all. Because of this, I'm taking extra care to make sure I have a high availability setup for collecting orderbook deltas.

There's two ways this could go, and it's not particularly clear from the API:

1. When you open two websocket clients, you get different order book partials
2. When you open two websocket clients, you get the same order book partials.

If you get different order book partials, some work will have to be done to merge them together at the end. If not, things should be easy.

Different partials?

```
               We need to reconstruct the order
               book here to continue from stream 2
                     | 
S1: [U    u][U    u]-|--x---[U    u][U    u]
                     |
S2:    [U    u][U    u][U    u][U    u][U    u]

```

I propose something like a hot-standby. Two websocket clients (preferably, different regions) are getting deltas. Say Stream 1 is the main stream -- if it fails, the orderbook must be reconstructed at the last known good delta in stream 1, and Stream 2 takes over as the main stream. Reverse the process when Stream 2 inevitably fails. 

I'm taking a microservice oriented design here, but I don't want a service that takes the two streams and produces one "good" stream -- IMO this introduces another point of failure. Knowing my shit engineering abilities, I'd rather offload the data to somewhere I can depend on ASAP.

Stream 1 and stream 2 will both be uploaded to an object store (think S3) for safe keeping. As I will use this as mostly historical data for backtesting, I can run a cronjob every night to clean the data, and only if successful, delete the temporary objects so that I am essential storing one stream.

## Testing the hypothesis

Will we get two different order book partials or the same? This simple python script prints the starting and ending update IDs of a websocket stream. 

If you're using NixOS, you can instantiate the appropriate python environment by doing:

```
nix-shell -p python38 python38Packages.python-binance
```

In this shell, you can run the following script:

```
from binance.client import Client
from binance.websockets import BinanceSocketManager

client = Client()
bm = BinanceSocketManager(client)

def process_message(msg):
    print(f"{msg['U']}    {msg['u']}")

bm.start_depth_socket('BTCUSDT', process_message)
bm.start()
```

Running two clients on my laptop produces these results (I stopped and started multiple times to see if that would give me a different result):

{{< figure src="/images/ha-binance-orderbook/local.png" caption="Local results giving identical orderbook deltas">}}

I started the process on the right and kept it running. I periodically ran the script on the left. You can see that the updates on the left match up with updates on the right.

I think it could also be that because these are both being served from the same server that they're going to give the same orderbook deltas. I'm in Canada, so I'll try spinning up a server in Europe which will hopefully use different servers.

I'm using Scaleway here because I plan to use their object stores in the future. First, I need their CLI client (I could do this in the browser, but it feels less _Hackerman_ (TM) like). 

```
nix-env -iA nixos.scaleway-cli
scw login
scw create --commercial-type=DEV1-S --name="ha_orderbook_test" ubuntu-bionic
```

It looks like the cli I pulled from NixOS is old (v1), so if you're using the new client these commands probably won't work.

It also returned a UUID but following with `scw ps` I don't see any servers. This is sus.

Ohhhh you have to start the instance after creating it. `scw start ha_orderbook_test`. Waiting for it to come up now. Also, `scw attach` funked up my terminal emulator. trust destroyed, lol. I'll SSH in like a heathen. You have to set up SSH keys beforehand, so it all works nicely once that's set up.

```
sudo apt update
sudo apt upgrade
sudo apt install python3-pip
pip3 install binance-python
```

Fun fact, `sudo apt install python3-pip` expects to use 200mb+. That's kinda crazy?!

Running the scripts on both my local machine and the Scaleway instance in France shows:

{{< figure src="/images/ha-binance-orderbook/france.png" caption="Instance in France giving identical orderbook deltas">}}

The orderbook deltas are the same. I'm fairly confident that we won't get any deltas that are different even when my data collectors are in different continents.

I still need a process for verifying the data from my multiple input streams, but I think I've written enough for now.
