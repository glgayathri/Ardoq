/*
2: Oslo city bikes has an open API showing real-time data on location and state of the bike stations. 

Your task is 
to create a small application that utilizes this api to show the stations and the amount of available bikes and free spots a station currently has.
You’re free to choose which language and libraries you use. How you show the stations and status is also up to you.
*/

//declaring DOM elements
const stationAddress = document.querySelector('.address');     //done
const station = document.querySelector('.station');     //done
const totalBikes = document.querySelector('.total-no');
const freeBikes = document.querySelector('.free-no');
const bookedBikes = document.querySelector('.booked-no');
 
window.addEventListener('load', () => {
  let long;
  let lat;
  var stations;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      getStationsAsync()
        .then(stationData => {
          console.log("Stations", stationData);

          getStationStatusAsync()
            .then(stationInfo => {
              console.log("Station info", stationInfo);
              showStationInfo(combinedResult(stationData, stationInfo));
            });
        });
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

function combinedResult(stationInfo, stationStatus){
    var combinedResult = [];

    for (let i = 0; i < stationInfo.data.stations.length; i++) {
    var stationDetails = stationStatus.data.stations.find(station => station.station_id === stationInfo.data.stations[i].station_id);
        
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

function showStationInfo(result) {

  for(let i=0; i < result.length; i++) {
    var stationName = document.createElement("div");
    stationName.id = "station" + i;
    stationName.textContent = `Station Name : ${result[i].stationName}`;    //Station Name

    var stationAddress = document.createElement("div");
    stationAddress.id = "address" + i;
    stationAddress.className="address"
    stationAddress.textContent = `Station Address : ${result[i].stationAddress}`;     //Station Address
    stationName.appendChild(stationAddress);

    var totalBikeAvailable = document.createElement("div");
    totalBikeAvailable.id = "Total" + i;
    totalBikeAvailable.className="total"
    totalBikeAvailable.textContent= `Total Bikes : ${result[i].totalBikes}`;      //Total Bikes
    stationName.appendChild(totalBikeAvailable);

    var freeBikes = document.createElement("div");
    freeBikes.id = "free" + i;
    freeBikes.className="free"
    freeBikes.textContent= `Free Bikes : ${result[i].availableBikes}`;       //Free Bikes
    stationName.appendChild(freeBikes);

    var reservedBikes = document.createElement("div");
    reservedBikes.id = "address" + i;
    reservedBikes.className="booked"
    reservedBikes.textContent = `Booked Bikes : ${result[i].bookedBikes}`;       //Booked Bikes
    stationName.appendChild(reservedBikes);

    station.appendChild(stationName);
 }   
}