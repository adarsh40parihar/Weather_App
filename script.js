const searchBtn = document.querySelector("#search");
const searchInput = document.querySelector("#search-input");
const temperature = document.querySelector("#temperature");
const locationShown = document.querySelector("#location");
const time = document.querySelector("#time");
const day = document.querySelector("#day");
const date = document.querySelector("#date");
const stateImg = document.querySelector("#stateImg");
const state = document.querySelector("#state");
const currentlocationBtn = document.querySelector("#currentLocationSvg");

/**************current location*****************/
//by reloading
window.addEventListener("load",async function () {
    fetchcurrentWeather();
})
// Fetch weather by clicking the current location button
currentlocationBtn.addEventListener("click",async function () {
    fetchcurrentWeather();
})
async function fetchcurrentWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const data = await fetchWeather(`${lat},${lon}`);
            if (data != null) {
                updateDOM(data);
            }
        }, function(error) {
            alert("Unable to retrieve your location");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


// for async function use then type or use await but for await you also need to write async in below function.
searchBtn.addEventListener("click", async function(){
    const locationInput = searchInput.value;
    if(locationInput){
        // fetchWeather(locationInput).then((data)=>{
        //     updateDOM(data);
        // });

        const data = await fetchWeather(locationInput);
        if(data!=null){
            updateDOM(data);
        }
        searchInput.value="";
    }
})
function updateDOM(data){
    temperature.textContent = data.current.temp_c + "°C";
    locationShown.textContent = data.location.name;
    state.textContent = data.current.condition.text;
    stateImg.src = data.current.condition.icon;
    time.innerText = data.location.localtime.substring(11);
    const currentDate = data.location.localtime.substring(0,10);
    date.innerText = currentDate;
    const dateObject = new Date(currentDate);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[dateObject.getDay()];
    day.innerText = dayName;
    console.log("After");
}
async function fetchWeather(locationInput) {
    const url = `http://api.weatherapi.com/v1/current.json?key=757c93d9e13d4343bb5184758242408&q=${locationInput}&aqi=no`
    const response = await fetch(url)
    if (response.status == 400) {
        alert("Location is Invalid");
        return null;
    } 
    else if(response.status == 404){
        alert("Location is Invalid");
        return null;
    }
    else if (response.status == 200) {

        const json = await response.json();
        return json;
    }
}
console.log("After");
