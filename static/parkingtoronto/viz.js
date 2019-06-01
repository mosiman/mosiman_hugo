$(document).ready(function() {
        
    var csrftoken = Cookies.get('csrftoken')
	var mymap = L.map('mapid').setView([43.653908, -79.384293], 13);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoibW9zaW1hbiIsImEiOiJjam4xNmdyZXIxZ3VtM3FybzM4dXRiOHM5In0.Yh0CQpkMw1PYQNDTSN2XpQ'
	}).addTo(mymap); 

    var active_polygon;
    var polyline;
	var popup = L.popup()



	function onMapClick(e){
		// This is going to be the workhorse function, probably.
		popup.setLatLng(e.latlng).setContent("Loading data for coordinates " + e.latlng.toString()).openOn(mymap)
        var datafetch = fetch("http://www.mosiman.ca/api/tss/tssloc?lat=" + e.latlng.lat.toString() + "&lng=" + e.latlng.lng.toString());
        // var datafetch = fetch("http://mosiman.ca/api/tss/tssloc?lat=43.672&lng=-79.387523").then(function(response){
        //     window.alert("fetch then");
        // })

        // fetch("https://www.google.ca").then(function(response){
        //     window.alert("fetch then");
        // })

        datafetch.then( response => {
            if (response.ok) {
                response.json().then( json => {
                    var data = json;
                    console.log(data.streetseg.Name)
                    popup.setLatLng(e.latlng).setContent(data.streetseg.Name).openOn(mymap)
                    document.getElementById("streetName").innerHTML = data.streetseg.Name
                    if (active_polygon){
                        mymap.removeLayer(active_polygon)
                    }
                    if (polyline){
                        mymap.removeLayer(polyline)
                    }

                    latlngs = data.nodes.map(x => [x.Lat, x.Lon])
                    polyline = new L.polyline(latlngs, {color: 'blue'}).addTo(mymap);
                    mymap.fitBounds(polyline.getBounds());

                    generateStats(data);
                })
            } else {
                popup.setLatLng(e.latlng).setContent("No parking tickets found for this location!").openOn(mymap);
             }
         })
	}

	mymap.on('click', onMapClick);

    function generateStats(data){
        infs = data.infs
        // Get tickethours
        var tickethours = infs.map(x => moment(x.Datetime).get("Hour"))
        Plotly.newPlot("hourlyhist", [{
            x: tickethours, 
            type: 'histogram',
            autobinx: false,
            xbins: {
                start: 0,
                end: 25
            }}],
            {
                title: 'Tickets by hour',
                xaxis: { title: 'Hour',
                    range: [0,23]},
                yaxis: { title: 'Number of tickets' }
            })

        // get interarrivals
        
        if (data.streetseg.Numtickets > 100){
            // assuming more than one ticket, surely lambda > 0...
            sorted_dt = infs.map( x => moment(x.Datetime))
            sorted_dt.sort(function(a,b){ return a-b })

            interarrivals = []

            for (let i = 0, size = sorted_dt.length - 1; i < size; i++){
                // divide for minutes
                timedelta = (sorted_dt[i+1] - sorted_dt[i]) / 60000
                if (timedelta > 15){
                    interarrivals.push(Math.floor(timedelta))
                }
            }

            expplot = preplot_exp(data.streetseg.Explambda, 0, Math.floor(Math.max.apply(Math, interarrivals)))
            console.log(expplot)

            interarrival_trace = {
                x: interarrivals,
                type: 'histogram',
            }
            expo_trace = {
                x: expplot[0],
                y: expplot[1],
                mode: 'lines'
            }
            Plotly.newPlot("interarrivalhist", [interarrival_trace],
                {
                    title: "Interarrival times",
                    xaxis: { title: 'Minutes' },
                    yaxis: { title: 'Frequency' }
                }
            )

            Plotly.newPlot("interarrivalboxplot", [{
                y: interarrivals,
                boxpoints: 'all', 
                jitter: 0.5,
                pointpos: -2,
                type: 'box' }],
                {
                    title: "Interarrival time boxplot"
                }
            )
        }


    }

	// thanks https://gist.github.com/joates/6584908
	function linspace(a,b,n) {
		if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
		if(n<2) { return n===1?[a]:[]; }
		var i,ret = Array(n);
		n--;
		for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
        return ret;
    } 

    function preplot_exp(explambda, start,end){
        // make it a logspace
        xs = linspace(start,end,5000)
        xs = xs.map(x => Math.pow(Math.E, x))
        ys = xs.map(x => explambda * Math.pow(Math.E, -1 * explambda * x))
        return [xs, ys]
    }



	$("#ajaxButton").click( function() {
		console.log("clickeddd")
		console.log(csrftoken)
        $.ajax({
            url: $("#Url").attr("data-url"), 
			headers: {
				"X-CSRFToken" : csrftoken
			},
            data: {somenum: 8},
            type: 'POST',
            success: function(data) {
                console.log(data.result)
            }})
	})


})
