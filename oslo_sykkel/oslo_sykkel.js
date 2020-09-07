/*
2: Oslo city bikes has an open API showing real-time data on location and state of the bike stations. 

Your task is 
to create a small application that utilizes this api to show the stations and the amount of available bikes and free spots a station currently has.
You’re free to choose which language and libraries you use. How you show the stations and status is also up to you.
*/

{/* <div class="main-station-id">Majorstuen             *****
                <div class="total">
                    <p>Total</p>
                    <div id="total-no">20</div>         *****
                </div>
                <div class="free">
                    <p>Free</p>
                    <div id="free-no">12</div>          ****
                </div>
                <div class="booked">
                    <p>Booked</p>
                    <div id="booked-no">8</div>         ****           */}

//declaring DOM elements
const stationId = document.querySelector('.main-station-id');
const totalBikes = document.querySelector('.total-no');
const freeBikes = document.querySelector('.free-no');
const bookedBikes = document.querySelector('.booked-no');

window.addEventListener('load', ()=>{
    let long;
    let lat;
    // const temperatureDescription = document.querySelector('.temperature-description');
    // const temperatureDegree = document.querySelector('.temperature-degree');
    // const locationTimezone = document.querySelector('.location-timezone');
    // const temperatureDegreeSection = document.querySelector('.temperature');
    // const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = "https://gbfs.urbansharing.com/oslobysykkel.no/system_information.json";

            fetch(api)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
        })

    }


})