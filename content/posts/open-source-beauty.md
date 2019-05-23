---
title: 'A small wonderful experience with open source'
date: 2019-05-22
---

I have to say, I've been using Linux for a couple years now. It's a bit late for me to head back to Windows-land. But not in all the years I've been surround by open source software have I realized the beauty of it all, until now. 

I have an old Garmin Vivosmart HR that had been gifted to me. I've been using it for a month or so. Very cool, keeps a lot of stats on me that I'm interested in. But as is very common these days, I simply downloaded the app and let it do the work. Access the data myself? I'd love to, but I doubt the manufacturer would make it easy. 

The manufacturer did not make it easy. 

But, the beauty of open source software, is that someone else has already done it. 

I googled "Garmin Vivosmart HR Ubuntu", which lead me to this wonderful [Github repo](https://github.com/Leberwurscht/vivosmart) with naught but a single star (me, an hour ago). The lad's provided a lovely script for accessing the inside bits of my Garmin.

What do now with this? 

{{< figure src="/images/open-source-beauty/garbo.png" caption="what do with this indecipherable log">}}

The log files are in an encoding that is not UTF-8, so what do I do now? Give up? NO! Give up after failing to find someone who's already done the work!

This wonderful [Github repo](https://github.com/mrihtar/Garmin-FIT) provides some Ruby (.. shudders ..) scripts for converting these files into human readable formats. Amazing!

Now with the help of (at least) two people that I don't know, whose work is fairly under the radar (compared to the latest Javascript doodad), I too have access to data I should've had from the get go. All because these fine people contributed their small bit of work to the public. Huzzah!
