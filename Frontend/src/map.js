function initialize() {
    //Тут починаємо працювати з картою
    var mapProp = {
        center: new google.maps.LatLng(50.464379, 30.519131),
        zoom: 11
    };
    var html_element = document.getElementById("googleMap");
    var map = new google.maps.Map(html_element, mapProp);
    //Карта створена і показана

    var point = new google.maps.LatLng(50.464379, 30.519131);
    var marker = new google.maps.Marker({
        position: point,
        //map	- це змінна карти створена за допомогою new	    google.maps.Map(...)
        map: map,
        icon: "assets/images/map-icon.png"
    });

    google.maps.event.addListener(map, 'click',
        function (me) {
            var coordinates = me.latLng;
            //coordinates	- такий самий об’єкт як створений new	        google.maps.LatLng(...)
        });


    function geocodeLatLng(latlng, callback) {
        //Модуль за роботу з адресою
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'location': latlng
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK && results[1]) {
                var adress = results[1].formatted_address;
                callback(null, adress);
            } else {
                callback(new Error("Can't	find	adress"));
            }
        });
    }

    google.maps.event.addListener(map,
        'click',
        function (me) {
            var coordinates = me.latLng;
            geocodeLatLng(coordinates, function (err, adress) {
                if (!err) {
                    //Дізналися адресу
                    console.log(adress);
                } else {
                    console.log("Немає адреси");
                }
            });
        });
}


function geocodeAddress(adress, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            var coordinates = results[0].geometry.location;
            callback(null, coordinates);
        } else {
            callback(new Error("Can	not	find	the	adress"));
        }
    });
}

function calculateRoute(A_latlng, B_latlng, callback) {
    var directionService = new google.maps.DirectionsService();
    directionService.route({
        origin: A_latlng,
        destination: B_latlng,
        travelMode: google.maps.TravelMode["DRIVING"]
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            varleg = response.routes[0].legs[0];
            callback(null, {
                duration: leg.duration
            });
        } else {
            callback(new Error("Can't	find	direction"));
        }
    });
}

//Коли сторінка завантажилась
google.maps.event.addDomListener(window, 'load', initialize);