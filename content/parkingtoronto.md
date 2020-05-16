---
title: Toronto Parking Ticket visualizer
---

<link rel="stylesheet" href="/parkingtoronto/viz.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin="" />

<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js" integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==" crossorigin=""></script>

<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://unpkg.com/moment"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/jstat@latest/dist/jstat.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>

<div class="container">
<div class="row">
<div class="col-lg-8 col-md-10 mx-auto">
<div id="mapid"></div>

<div id="streetinfo">
<p align="left">
View parking ticket statistics for each street by finding your desired street and clicking on it. Note that some streets may not appear in the database, so try a nearby street. In this box, you'll have more in-depth statistics of the particular street.
</p>
</div>

<script type="text/javascript" src="/parkingtoronto/viz.js"></script>

<div id="moreInfo">

<h3 id="streetName"> </h3>

<div width="75%" align="center" min-height="400px"> 

<div id="numInfractions"> </div>

<div id="modeCode"> </div>

<div id="avgFine"> </div>

<div id="hourlyhist"></div>

<div id="interarrivalhist"></div>

<div id="interarrivalboxplot"></div>
</div>
</div>

</div>
</div>
</div>
