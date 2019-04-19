---
title: Website update
date: 2019-04-18
---

# I've updated my website!

My previous website used Django in the backend. I ended up using it for basically everything, like showing off my projects on the front page, storing blog posts, and serving the API for my parking ticket application. But truthfully, until I had the parking ticket app, I had no reason at all to have a fully fledged backend. And I presume that, for the most part, I won't really need a large monolithic framework like Django. It was great to learn about the backend, though.

This new site is made with [Hugo](https://gohugo.io/). To be honest, it took some time to learn about Go's (and Hugo's) templating system (it's a lot different from Jinja!), but now that I've gotten the hang of it a bit, it's really pretty great. I have a lot to learn on the Hugo side of things, but I'm a bit glad I'm not using Django anymore. My site really was overengineered.

My future plans with this site are mainly to make blog posts, and using Hugo to add or modify posts is a breeze. Eventually I will bring back the parking ticket application (I'm going to rewrite the backend in C#), but even for interactive content, I think a dedicated server for REST APIs will be sufficient. 
