---
title: "Exposing services on csclub.uwaterloo.ca"
date: 2020-05-16T13:39:49-04:00
---

I will admit I didn't get very much out of the University of Waterloo other than layers of geese shit caked under my shoes, but the [computer science club](https://csclub.uwaterloo.ca/) is a gem. 

If you're a current student or alumni, I highly recommend paying for the termly membership -- at the time of writing, it's 2 dollars a term. I've given them a decent chunk of cash at some point so I won't have to keep thinking about renewing. 

The CSC generously gives you some web space. It should be accessible at `csclub.uwaterloo.ca/~WATIAM`, but don't go to mine because I've very sinfully hardcoded my domain name so things will be broken. 

Throwing html in your `~/www` folder will be immediately accessible at the above URL, but what if you want to run a server? 

First, choose a high port number nobody's using. Say, `33333`. 

Then, log into `caffeine.csclub.uwaterloo.ca`, the webserver. In your `~/www` folder, make a file called `.htaccess` and add the following:

```
Options +FollowSymLinks                                                      
RewriteEngine On

RewriteCond %{SCRIPT_FILENAME} !-d
RewriteCond %{SCRIPT_FILENAME} !-f
RewriteRule "^test/(.*)$" "http://localhost:33333/$1" [P]
```

I don't know much about Apache's `.htaccess` configuration language, but you can think of `"^test/(.*)$"` like a regex that looks for urls of the form `csclub.uwaterloo.ca/~WATIAM/test/-------` and maps them to `http://localhost:33333/$1` where `$1` is all the stuff that comes after `~WATIAM/test/`

We're in `caffeine`, the server that's processing the requests, so let's run a simple python server to test this out. Run 

```
/usr/bin/python3 -m http.server 33333
```

(or instead of 33333, whatever high port number you've chosen) 

This creates a small server running at `localhost:33333` that displays all the stuff in the directory you ran the program from. 

Now, head to `http://csclub.uwaterloo.ca/~WATIAM/test/` (trailing slash!!) and voila! A real live program exposed to the internet! You should probably shut it down before someone mucks through all your files.

At the time of writing, this is how my [parking ticket visualizer](/parkingtoronto/) dynamically responds to requests. 

There's a bit more involved if you want to keep your service running, and for longer. I won't pretend to have it all figured it out, but for starters
- Use a real web server! One that can handle lots of requests (e.g., not your built-in Flask/Django development server). For python, try [gunicorn](https://gunicorn.org/). 
- If your service is heavy, offload it to one of the CSC's other servers. I currently use an SSH reverse proxy to have `caffeine` see my service (on `hfcs`) as if it's on localhost. I really think there has to be a better way, but.. I don't know how! Please, if you have any ideas, I'm all ears! Shoot me an email!

Exercises!
- Host your own blog on the csclub!
- Can you expose a `jupyter notebook` instance? 
- How would you proxy services to `caffeine`?

This is mostly parroted from the [CSC's wiki page](https://wiki.csclub.uwaterloo.ca/Web_Hosting), I suggest you also read that.

Happy hosting!

