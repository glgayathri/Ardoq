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
  getStationsAsync()
    .then(stationData => {
      console.log("Stations", stationData);

      getStationStatusAsync()
        .then(stationInfo => {
          console.log("Station info", stationInfo);
          showStationInfo(combinedResult(stationData, stationInfo));
        });
    });
})

async function getStationsAsync() {
  let response = await fetch(`https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json`);
  let data = await response.json()
  return data;
}

async function getStationStatusAsync() {
  let response = await fetch(`http://gbfs.urbansharing.com/oslobysykkel.no/station_status.json`);
  let data = await response.json()
  return data;
}

function combinedResult(stationInfo, stationStatus) {
  var combinedResult = [];

  for (let i = 0; i < stationInfo.data.stations.length; i++) {
    var stationDetails = stationStatus.data.stations.find(station => station.station_id === stationInfo.data.stations[i].station_id);
    if (stationDetails != null) {
      combinedResult.push({
        "stationId": stationDetails.station_id,
        "stationName": stationInfo.data.stations[i].name,
        "stationAddress": stationInfo.data.stations[i].address,
        "totalBikes": stationInfo.data.stations[i].capacity,
        "availableBikes": stationDetails.num_bikes_available,
        "bookedBikes": stationDetails.num_docks_available
      });
    }
  }
  console.log(combinedResult);
  return combinedResult;
}

function showStationInfo(result) {

  for (let i = 0; i < result.length; i++) {
    var stationName = document.createElement("div");
    stationName.id = "stationName" + result[i].stationId;
    stationName.className = "stationName";
    stationName.textContent = `Station Name : ${result[i].stationName}`;    //Station Name

    var stationAddress = document.createElement("div");
    stationAddress.id = "stationAddress" + result[i].stationId;
    stationAddress.className = "address"
    stationAddress.textContent = `Station Address : ${result[i].stationAddress}`;     //Station Address
    stationName.appendChild(stationAddress);

    var totalBikeAvailable = document.createElement("div");
    totalBikeAvailable.id = "Total" + result[i].stationId;
    totalBikeAvailable.className = "total"
    totalBikeAvailable.textContent = `Total Bikes : ${result[i].totalBikes}`;      //Total Bikes
    stationName.appendChild(totalBikeAvailable);

    var freeBikes = document.createElement("div");
    freeBikes.id = "free" + result[i].stationId;
    freeBikes.className = "free"
    freeBikes.textContent = `Free Bikes : ${result[i].availableBikes}`;       //Free Bikes
    stationName.appendChild(freeBikes);

    var reservedBikes = document.createElement("div");
    reservedBikes.id = "reservedBikes" + result[i].stationId;
    reservedBikes.className = "booked"
    reservedBikes.textContent = `Booked Bikes : ${result[i].bookedBikes}`;       //Booked Bikes
    stationName.appendChild(reservedBikes);

    station.appendChild(stationName);

  }
  setInterval(updateBikeStatus, 10000);
}

function updateBikeStatus() {
  getStationsAsync()
    .then(stationData => {
      console.log("Stations", stationData);

      getStationStatusAsync()
        .then(stationInfo => {
          console.log("Update Station info", stationInfo);
          updateStationInfo(combinedResult(stationData, stationInfo));
        });
    });
}

function updateStationInfo(result) {

  for (let i = 0; i < result.length; i++) {

    var totalBikeAvailable = document.getElementById("Total" + result[i].stationId);
    totalBikeAvailable.textContent = `Total Bikes : ${result[i].totalBikes}`;      //Total Bikes

    var freeBikes = document.getElementById("free" + result[i].stationId);
    freeBikes.textContent = `Free Bikes : ${result[i].availableBikes}`;       //Free Bikes

    var reservedBikes = document.getElementById("reservedBikes" + result[i].stationId);
    reservedBikes.textContent = `Booked Bikes : ${result[i].bookedBikes}`;       //Booked Bikes
  }
}

function search() {
  var name = document.getElementById("searchForm").elements["searchItem"].value;
  var pattern = name.toLowerCase();
  var targetId = "";

  var divs = document.getElementsByClassName("stationName");
  for (var i = 0; i < divs.length; i++) {
    var index = divs[i].innerText.toLowerCase().indexOf(pattern);
    if (index != -1) {
      targetId = divs[i].id;
      document.getElementById(targetId).scrollIntoView();
      break;
    }
  }
}

