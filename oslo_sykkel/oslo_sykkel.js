/*
2: Oslo city bikes has an open API showing real-time data on location and state of the bike stations. 

Your task is 
to create a small application that utilizes this api to show the stations and the amount of available bikes and free spots a station currently has.
You’re free to choose which language and libraries you use. How you show the stations and status is also up to you.
*/

/* <div class="main-station-id">Majorstuen             *****
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
                    <div id="booked-no">8</div>         ****           */

//declaring DOM elements
const stationAddress = document.querySelector('.address');     //done
const station = document.querySelector('.station');     //done


const totalBikes = document.querySelector('.total-no');
const freeBikes = document.querySelector('.free-no');
const bookedBikes = document.querySelector('.booked-no');
 
window.addEventListener('load', ()=>{
    let long;
    let lat;
    var stations;
 
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        /*Promise.allSettled(getStaionsAsync()).then(data => {
            console.log(data);
                stations=data;
             });*/
         getStationsAsync()
         .then(data => {console.log("Stations", data);
         getStationStatusAsync().then(stationInfo=>{console.log("Station info", stationInfo);
         showStationInfo(combineResult(data, stationInfo));
        });}); 
      //   showStationInfo(stations);   
       })
    }
})

    async function getStationsAsync() 
{
  let response = await fetch(`https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json`);
  let data =  await response.json()
  return data;
}

async function getStationStatusAsync() 
{
  let response = await fetch(`http://gbfs.urbansharing.com/oslobysykkel.no/station_status.json`);
  let data =  await response.json()
  return data;
}

function combineResult(stationInfo, stationStatus){
    var combinedResult = [];

    for (let i = 0;i< stationInfo.data.stations.length; i++){
    var stationDetails = stationStatus.data.stations.find(station=> station.station_id=== stationInfo.data.stations[i].station_id);

        // console.log("Station Detials ", stationDetails);
        // console.log("Station name ", stationInfo.data.stations[i].name);
        // console.log("Bikes Available ", stationDetails.num_bikes_available);

        combinedResult.push({"stationId": stationDetails.station_id,
        "stationName": stationInfo.data.stations[i].name,
        "stationAddress": stationInfo.data.stations[i].address,
        "totalBikes": stationInfo.data.stations[i].capacity,
        "availableBikes": stationDetails.num_bikes_available,
        "bookedBikes": stationDetails.num_docks_available});
    }
    console.log(combinedResult);
    return combinedResult;
}

function showStationInfo (result) {
    
  for(let i=0; i < result.length; i++) {
    var stationName = document.createElement("div");
    stationName.id = "station" + i;
    //stationName.className="address"
    stationName.textContent= result[i].stationName;

    var stationAddress = document.createElement("div");
    stationAddress.id = "address" + i;
    stationAddress.className="address"
    stationAddress.textContent= result[i].stationAddress;
    stationName.appendChild(stationAddress);

    var totalBikeAvailable = document.createElement("div");
    totalBikeAvailable.id = "Total" + i;
    totalBikeAvailable.className="total"
    totalBikeAvailable.textContent= result[i].totalBikes;
    stationName.appendChild(totalBikeAvailable);

    var freeBikes = document.createElement("div");
    freeBikes.id = "free" + i;
    freeBikes.className="free"
    freeBikes.textContent= result[i].availableBikes;
    stationName.appendChild(freeBikes);

    var reservedBikes = document.createElement("div");
    reservedBikes.id = "address" + i;
    reservedBikes.className="booked"
    reservedBikes.textContent= result[i].bookedBikes;
    stationName.appendChild(reservedBikes)

    station.appendChild(stationName);
 }   
}


