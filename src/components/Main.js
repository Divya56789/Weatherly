import React, { useState } from "react";
import axios from "axios";
import apikey from "./Apikey";
import pic7 from "./images/pic7.avif";
import speedometer from "./images/speedometer1.svg";
import upward from "./images/Upward Arrow.svg";
import downward from "./images/Scroll Down.svg";
import search from "./images/search.svg";
import clouds_1 from "./images/clouds_1.svg";
import sun from "./images/sun.svg";
import moon from "./images/Moon.svg";
import sun_behind_cloud from "./images/sun_behind_cloud.svg";
import moon_behind_cloud from "./images/moon_behind_cloud.svg";
import clouds from "./images/clouds.svg";
import rain from "./images/rain.svg";
import rainy_night from "./images/rainy_night.svg";
import sun_behind_rain_cloud from "./images/sun_behind_rain_cloud.svg";
import lightning from "./images/cloud_with_lightning.svg";
import snow from "./images/winter.svg";
import fog from "./images/fog.svg";
import cloud from "./images/cloud.svg";
import buildings from './images/buildings.avif';
import temp from './images/temperature.svg'
import "./main.css";
import ReactSpeedometer from "react-d3-speedometer";

function Main() {
    const [location, setLocation] = useState("");
    const [unit, setUnit] = useState("metric")
  const [result, setResult] = useState({
    temp: "",
    maxTemp: "",
    minTemp: "",
    humidity: "",
    pressure: "",
    windSpeed: "",
    clouds: "",
    sunRise: "",
    sunSet: "",
    date: "",
    cityName: "",
    weatherMain: "",
    weatherDesc: "",
    icon: "",
  });

  const searchPlaces = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            appid: apikey,
            units: unit,
            q: location,
          }
        })
        .then((res) => {
          setResult({
            temp: res.data.main.temp,
            maxTemp: res.data.main.temp_max,
            minTemp: res.data.main.temp_min,
            humidity: res.data.main.humidity,
            pressure: res.data.main.pressure,
            windSpeed: res.data.wind.speed,
            clouds: res.data.clouds.all,
            sunRise: res.data.sys.sunrise,
            sunSet: res.data.sys.sunset,
            date: res.data.dt,
            cityName: res.data.name,
            weatherMain: res.data.weather[0].main,
            weatherDesc: res.data.weather[0].description,
            icon: res.data.weather[0].icon,
            visibility: res.data.visibility / 1000,
          });
        }).catch((error) => {
          return alert("Place not found 😔 ,"+ error.message)
        })
    }
  };

  const changeToCelFarh = (unit) => {
    setUnit(unit)
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          appid: apikey,
          units: unit,
          q : result.cityName
        }
      })
      .then((res) => {
        setResult({
          temp: res.data.main.temp,
          maxTemp: res.data.main.temp_max,
          minTemp: res.data.main.temp_min,
          humidity: res.data.main.humidity,
          pressure: res.data.main.pressure,
          windSpeed: res.data.wind.speed,
          clouds: res.data.clouds.all,
          sunRise: res.data.sys.sunrise,
          sunSet: res.data.sys.sunset,
          date: res.data.dt,
          cityName: res.data.name,
          weatherMain: res.data.weather[0].main,
          weatherDesc: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          visibility: res.data.visibility / 1000,
        });
      });
  };

  // change unix time to normal time
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  let date = result.date;
  let newDate = new Date(date * 1000);
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`

  // change sunrise and sunset unix time to normal time
  let sunrise = result.sunRise;
  let sunset = result.sunSet;

  let riseDate = new Date(sunrise * 1000);
  let setDate = new Date(sunset * 1000);

  let riseHours =  riseDate.getHours();
  let setHours = setDate.getHours();

  let riseMinutes = riseDate.getMinutes();
  let setMinutes = setDate.getMinutes();

  let sunriseTime = `${padTo2Digits(riseHours)}:${padTo2Digits(riseMinutes)}`
  let sunsetTime = `${padTo2Digits(setHours)}:${padTo2Digits(setMinutes)}`

  
  return (
    <div className="container">
      <nav>
        <div className="weather-report">
          <h3>Weather Report</h3>
        </div>

        <div className="cel-frah">
          <button onClick={() => changeToCelFarh("metric")} style={{color : unit==="metric"? "white": "black" , backgroundColor: unit==="metric"? "black":"white"}}>
            <span>&#186;C</span>
          </button>
          <button onClick={() => changeToCelFarh("imperial")} style={{color : unit==="imperial"? "white": "black" , backgroundColor: unit==="imperial"? "black":"white"}}>
            <span>&#186;F</span>
          </button>
        </div>

        <div className="avatar">
          <img src={pic7} alt="pic6" />
        </div>
      </nav>
      <section>
      <div className="sidebar">
      <div className="searchbar">
        <img src={search} alt="searchIcon" />
        <input
          type="text"
          placeholder="Search for places..."
          value={location}
          onKeyPress={searchPlaces}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="currentDayImage">
        {result.icon === "01d" ? (
          <img src={sun} alt="clear sky" />
        ) : result.icon === "01n" ? (
          <img src={moon} alt="clear sky" />
        ) : result.icon === "02d" ? (
          <img src={sun_behind_cloud} alt="few clouds" />
        ) : result.icon === "02n" ? (
          <img src={moon_behind_cloud} alt="few clouds" />
        ) : result.icon === "03d" || result.icon === "03n" ? (
          <img src={clouds_1} alt="scattered clouds" />
        ) : result.icon === "04d" || result.icon === "04n" ? (
          <img src={clouds} alt="broken clouds" />
        ) : result.icon === "09d" || result.icon === "09n" ? (
          <img src={rain} alt="shower rain" />
        ) : result.icon === "10d" ? (
          <img src={sun_behind_rain_cloud} alt="rain" />
        ) : result.icon === "10n" ? (
          <img src={rainy_night} alt="rain" />
        ) : result.icon === "11d" || result.icon === "11n" ? (
          <img src={lightning} alt="thunderstorm" />
        ) : result.icon === "13d" || result.icon === "13n" ? (
          <img src={snow} alt="snow" />
        ) : result.icon === "50d" || result.icon === "50n" ? (
          <img src={fog} alt="fog" />
        ) : (
          <img src={cloud} alt="cloud" />
        )}
      </div>

      <div className="currentDetail1">
        <div className="temp">
          {unit === "metric" ? (
            <h1>{Math.round(result.temp)}&#186;C</h1>
          ) : (
            <h1>{Math.round(result.temp)}&#186;F</h1>
          )}
          <p>
            {result.cityName ? result.cityName : "Location"}, <span>{time}</span>
          </p>
        </div>
      </div>
      <div className="currentDetail2">
        <div className="main">
          {result.icon === "01d" ? (
            <img src={sun} alt="clear sky" width={20} height={20} />
          ) : result.icon === "01n" ? (
            <img src={moon} alt="clear sky" width={20} height={20} />
          ) : result.icon === "02d" ? (
            <img
              src={sun_behind_cloud}
              alt="few clouds"
              width={20}
              height={20}
            />
          ) : result.icon === "02n" ? (
            <img
              src={moon_behind_cloud}
              alt="few clouds"
              width={20}
              height={20}
            />
          ) : result.icon === "03d" || result.icon === "03n" ? (
            <img src={clouds_1} alt="scattered clouds" width={20} height={20} />
          ) : result.icon === "04d" || result.icon === "04n" ? (
            <img src={clouds} alt="broken clouds" width={20} height={20} />
          ) : result.icon === "09d" || result.icon === "09n" ? (
            <img src={rain} alt="shower rain" width={20} height={20} />
          ) : result.icon === "10d" ? (
            <img src={sun_behind_rain_cloud} alt="rain" />
          ) : result.icon === "10n" ? (
            <img src={rainy_night} alt="rain" width={20} height={20} />
          ) : result.icon === "11d" || result.icon === "11n" ? (
            <img src={lightning} alt="thunderstorm" width={20} height={20} />
          ) : result.icon === "13d" || result.icon === "13n" ? (
            <img src={snow} alt="snow" width={20} height={20} />
          ) : result.icon === "50d" || result.icon === "50n" ? (
            <img src={fog} alt="fog" width={20} height={20} />
          ) : (
            <img src={cloud} alt="cloud" width={20} height={20} />
          )}

          <p>{result.weatherMain ? result.weatherMain : "Weather Main"}</p>
        </div>
        <div className="discription">
          {result.icon === "01d" ? (
            <img src={sun} alt="clear sky" width={20} height={20} />
          ) : result.icon === "01n" ? (
            <img src={moon} alt="clear sky" width={20} height={20} />
          ) : result.icon === "02d" ? (
            <img
              src={sun_behind_cloud}
              alt="few clouds"
              width={20}
              height={20}
            />
          ) : result.icon === "02n" ? (
            <img
              src={moon_behind_cloud}
              alt="few clouds"
              width={20}
              height={20}
            />
          ) : result.icon === "03d" || result.icon === "03n" ? (
            <img src={clouds_1} alt="scattered clouds" width={20} height={20} />
          ) : result.icon === "04d" || result.icon === "04n" ? (
            <img src={clouds} alt="broken clouds" width={20} height={20} />
          ) : result.icon === "09d" || result.icon === "09n" ? (
            <img src={rain} alt="shower rain" width={20} height={20} />
          ) : result.icon === "10d" ? (
            <img
              src={sun_behind_rain_cloud}
              alt="rain"
              width={20}
              height={20}
            />
          ) : result.icon === "10n" ? (
            <img src={rainy_night} alt="rain" width={20} height={20} />
          ) : result.icon === "11d" || result.icon === "11n" ? (
            <img src={lightning} alt="thunderstorm" width={20} height={20} />
          ) : result.icon === "13d" || result.icon === "13n" ? (
            <img src={snow} alt="snow" width={20} height={20} />
          ) : result.icon === "50d" || result.icon === "50n" ? (
            <img src={fog} alt="fog" width={20} height={20} />
          ) : (
            <img src={cloud} alt="cloud" width={20} height={20} />
          )}

          <p>{result.weatherDesc ? result.weatherDesc : "Weather Description"}</p>
        </div>
      </div>
      <div className="image">
        <img src={buildings} alt="city" />
      </div>
      {/* <div className="sidebarfooter">footer</div> */}
    </div>
      </section>
      <div className="daydetail">
        <div className="clouds">
          <h3>Clouds</h3>
          <img src={clouds_1} alt="cloud" width={40} height={40}/>
          <h3>{result.clouds ? result.clouds : 0}</h3>
        </div>

        <div className="max-temp">
          <h3>Max_temp</h3>
          <img src={temp} alt="temp" width={40} height={40}/>
          {unit === "metric" ? (
            <h3>{Math.round(result.maxTemp)}&#186;C</h3>
          ) : (
            <h3>{Math.round(result.maxTemp)}&#186;F</h3>
          )}       
           </div>

        <div className="min-temp">
          <h3>Min_temp</h3>
          <img src={temp} alt="temp" width={40} height={40}/>
          {unit === "metric" ? (
            <h3>{Math.round(result.minTemp)}&#186;C</h3>
          ) : (
            <h3>{Math.round(result.minTemp)}&#186;F</h3>
          )}       
           </div>
      </div>
      <div className="today-highlights">
        <h3>Today's Highlights</h3>
      </div>
      <div className="content1">
        <p id="c1-p">Wind Speed</p>
        <div className="speedometer">
          <ReactSpeedometer
            width={260}
            height={160}
            ringWidth={40}
            maxValue={50}
            value={Number(result.windSpeed)}
            needleColor="black"
            startColor="orange"
            segments={5}
          />
        </div>
      </div>
      <div className="content2">
        <p id="c2-p">Wind Status</p>
        {unit === "metric" ? (
          <h1 className="c2-h1">
            {result.windSpeed} <span style={{fontSize:"medium"}}>m/s</span>
          </h1>
        ) : (
          <h1 className="c2-h1">
            {result.windSpeed} <span style={{fontSize:"medium"}}>miles/hr</span>
          </h1>
        )}
        <div className="windStatus">
          <img src={speedometer} alt="speedometer" width={40} height={40} />
          <p>WSW</p>
        </div>
      </div>
      <div className="content3">
        <p id="c3-p">Sunrise & Sunset</p>
        <div className="sunrise">
          <img src={upward} alt="upward" />
          <h3>{sunriseTime}</h3>
        </div>
        <div className="sunset">
          <img src={downward} alt="downward" />
          <h3>{sunsetTime}</h3>
        </div>
      </div>
      <div className="content4">
        <p id="c4-p">Humidity</p>
        <h1 className="c4-h1">
          {result.windSpeed} <span style={{fontSize:"medium"}}>%</span>
        </h1>
        <div className="humidity">
          <h3>{result.humidity >= 30 || result.humidity <= 60 ? "Normal": ""}</h3>
          <p style={{fontSize: "40px"}}>{result.humidity >= 30 || result.humidity <= 60 ? "👍": "👎"}</p>
        </div>
      </div>
      <div className="content5">
        <p id="c5-p">Visibility</p>
        <h1 className="c5-h1">
          {result.visibility} <span style={{fontSize:"medium"}}>km</span>
        </h1>
        <div className="visibility">
            <h3>{result.visibility === 10 ? "Maximum" : result.visibility >=3 || result.visibility <=6 ? "Average" : "Good"}</h3>
            <p style={{fontSize: "40px"}}>{result.visibility === 10 ? "😟" : result.visibility >=3 || result.visibility <=6 ? "🙁" : "🙂"}</p>
        </div>
      </div>
      <div className="content6">
        <p id="c6-p">Pressure</p>
        <h1 className="c6-h1">
          {result.pressure} <span style={{fontSize:"medium"}}>hPa</span>
        </h1>
        <div className="pressure">
          <h3>At sea level</h3>
          <p style={{ fontSize: "40px" }}>🌊</p>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default Main;
