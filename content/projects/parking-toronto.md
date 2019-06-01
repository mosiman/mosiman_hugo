---
title: Toronto Parking Ticket Data Analysis and Visualization
date: 2018-10-24
featured_image: "/images/parking_ticket_thumbnail.png"
---


{{< figure src="/images/parking_ticket_thumbnail.png" link="http://mosiman.ca/parkingtoronto">}}

An interactive visualisation of parking ticket data published by the <a href=https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/transportation/#75d14c24-3b7e-f344-4412-d8fd41f89455>Toronto Open Data Catalogue </a>, using 2016 data. Analysis was done in Julia, and visualization and interactivity with <a href=https://leafletjs.com/>Leaflet.js</a>. Users can view parking ticket data by finding and clicking on a street.

Tools: Julia, Javascript with Leaflet.js, and .NET Core.[^1]

### Update!

I have ported my API over to be served with .NET Core, and the web app is live again! Feel free to have a visit ![here](http://mosiman.ca/parkingtoronto)

[^1]: Previously served with Django, but I wasn't a fan of my site architecture (Django controlled everything, a bit overkill) so I redid it!

