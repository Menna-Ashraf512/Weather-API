let searchInput = document.getElementById("search");

let arrWeather = [];

/* -------get Weather-------- */
async function get(country) {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ba9ee5d0ba2247ecb72222437240912&q=${country}&days=3`);
        let data = await response.json();
        let locationName = data.location.name;
        let forecastData = data.forecast.forecastday;
        let current = data.current;
        let degrees = current.temp_c;
        let condition = current.condition.text; 
        let icon = current.condition.icon;

        arrWeather = { locationName, forecastData, current, condition, degrees, icon };
        displayWeather(arrWeather);
}
get("Egypt");

let searchCountry = "Egypt";
searchInput.addEventListener("input", function(e){
    let country = e.target.value.trim()
    searchCountry=country
    if(country.length > 0){
        get(country);
    }else {
        get("searchCountry");
    }
})

/* ------- End get Weather-------- */

/* -------------display weather--------------- */
function displayWeather(weatherData) {
    let months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];

    let date = new Date();
    let month = months[date.getMonth()];
    let day = date.getDate();
    let dayName = days[date.getDay()];

    let content = `
        <div class="col-12 col-md-4">
            <div class="card h-100 ">
                <div class="card-header  d-flex justify-content-between">
                    <div class="frDay">${dayName}</div>
                    <div class="Month">${day} ${month}</div>
                </div>
                <div class="card-body d-flex flex-column justify-content-between py-5">
                    <p class="location mt-2">${weatherData.locationName}</p>
                    <div class="degree d-flex align-items-center justify-content-around">
                        <div class="num">${weatherData.degrees}<sup>o</sup>C</div>
                        </div>
                        <div class="icon-weather">
                            <img src="${weatherData.icon}" width="90" alt="${weatherData.condition}">
                        </div>
                    <div class="text_color">${weatherData.condition}</div>
                        <div class=" d-flex gap-3 mt-3">
                        <span><img class="me-2" src="images/icon-umberella.png" alt="icon">20%</span>
                        <span><img class="me-2" src="images/icon-wind.png" alt="icon">18Km/h</span>
                        <span><img class="me-2" src="images/icon-compass.png" alt="icon">East</span>
                    </div>
                </div>
            </div>
        </div>`;


    weatherData.forecastData.forEach((forecast, index) => {
        if (index === 1) { 
            let forecastDate = new Date(forecast.date);
            content += `
                <div class="col-12 col-md-4">
                    <div class="card h-100">
                        <div class="card-header dark  d-flex justify-content-center">
                            <div class="secDay">${days[forecastDate.getDay()]}</div>
                        </div>
                        <div class="card-body dark py-5 text-center">
                            <div class="icon-weather mb-3">
                                <img src="${forecast.day.condition.icon}" width="48" alt="${forecast.day.condition.text}">
                            </div>
                            <div class="degree d-flex flex-column">
                                <div class="fs-3">${forecast.day.maxtemp_c}<sup>o</sup>C</div>
                                <div class="text-secondary fw-bold">${forecast.day.mintemp_c}<sup>o</sup>C</div>
                            </div>
                            <div class="text_color mt-4">${forecast.day.condition.text}</div>
                        </div>
                    </div>
                </div>`;
        }else if(index ===2){
            let forecastDate = new Date(forecast.date);
            content += `
                <div class="col-12 col-md-4">
                    <div class="card h-100 ">
                        <div class="card-header d-flex justify-content-center">
                            <div class="secDay">${days[forecastDate.getDay()]}</div>
                        </div>
                        <div class="card-body py-5 text-center">
                            <div class="icon-weather mb-3">
                                <img src="${forecast.day.condition.icon}" width="48" alt="${forecast.day.condition.text}">
                            </div>
                            <div class="degree d-flex flex-column">
                                <div class="fs-3">${forecast.day.maxtemp_c}<sup>o</sup>C</div>
                                <div class="text-secondary fw-bold">${forecast.day.mintemp_c}<sup>o</sup>C</div>
                            </div>
                            <div class="text_color mt-4">${forecast.day.condition.text}</div>
                        </div>
                    </div>
                </div>`;
        }
    });
    document.getElementById("weatherData").innerHTML = content;
}
/* -------------End display weather--------------- */
