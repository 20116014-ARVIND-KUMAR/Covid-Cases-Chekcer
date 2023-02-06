map.on('load',()=>{
    map.addSource('data',{
        type:'geojson',
        data:'data.json'
    })

    map.addLayer({
        id:'data_map',
        source:'data',
        type:'circle',
        paint:{
            'circle-color': '#4264fb',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
         
    })

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });

    map.on('mouseenter', 'data_map', (e) => {
            // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
             
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        let description=`<b>Infected:<b>${e.features[0].properties.infected}<br>
        <b>Recovered:<b>${e.features[0].properties.recovered}<br>
        <b>Dead:<b>${e.features[0].properties.dead}<br>
        <b>Sick:<b>${e.features[0].properties.sick}<br>`
      
             
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
             
            // Populate the popup and set its coordinates
            // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });


        map.on('mouseleave', 'data_map', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
            });
        

         const geocoder = new MapboxGeocoder({
                // Initialize the geocoder
            accessToken: mapboxgl.accessToken, // Set the access token
            mapboxgl: mapboxgl, // Set the mapbox-gl instance
            // marker: false // Do not use the default marker style
            
            });
              
            // Add the geocoder to the map
            document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
  
    

    

    
});





    
    
