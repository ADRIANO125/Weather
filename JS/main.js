const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherDatials = document.querySelector(".weather-details");
const weatherBox = document.querySelector(".weather-box")
const error404 = document.querySelector(".not-found");



search.addEventListener('click' ,()=>{


    
    
    const ApiKey ="8d13ed277386457bf769c21d0bd40c16"
    const city = document.querySelector(".search-box input").value;

    if(city =="")
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`)
    .then(response => response.json()).then(json=>{


        if(json.cod =="404"){
            container.style.height ="450px";
            weatherBox.classList.remove('active');
            weatherDatials.classList.remove('active');
            error404.classList.add('active');
            return;
        }


        container.style.height ="555px";
        weatherBox.classList.add('active');
        weatherDatials.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector(".weather-box img");
        const temp = document.querySelector(".weather-box .temp");
        const desc = document.querySelector(".weather-box .desciption");
        const humidity = document.querySelector(".weather-details .humidaty span");
        const wind = document.querySelector(".weather-details .wind span");

        switch (json.weather[0].main.toLowerCase()) {
            case "clear":
                image.src = 'images/clear.png';
                break;

            case "rain":
                image.src = 'images/rain.png';
                break;

            case "snow":
                image.src = 'images/snow.png';
                break;

            case "mist":
                image.src = 'images/mist.png';
                break;

            case "clouds":
                image.src = 'images/cloud.png';
                break;

            case "haze":
                image.src = 'images/mist.png';
                break;

            default:
                image.src = 'images/cloud.png';
        }

        temp.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
        desc.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        document.querySelector(".search-box input").value ="";
    })

});

