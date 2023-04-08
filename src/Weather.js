import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormatDate";

import "./Weather.css";

export default function Weather(props) {
  const [ready, setReady] = useState(false);
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultcity);

  function handleResponse(response) {
    setWeatherData({
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    setReady(true);
  }

  function search() {
    const apiKey = "df0a2843c2fa36a73178f1e35e3378f6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleNewCity(event) {
    setCity(event.target.value);
  }

  if (ready) {
    return (
      <div className="weather-app">
        <form id="city-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9" id="city-search">
              <input
                id="city-input"
                type="search"
                placeholder="Enter a city"
                autoFocus="on"
                autoComplete="off"
                className="form-control search-input"
                onChange={handleNewCity}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                className="btn btn-primary w-100"
                id="button-search"
                value="Search"
              />
            </div>
          </div>
        </form>

        <h1 id="city-name">{weatherData.city}</h1>
        <ul className="nowInfo">
          <li id="date">
            <FormattedDate date={weatherData.date} />
          </li>
          <li className="text-capitalize" id="weather-description">
            {weatherData.description}
          </li>
        </ul>
        <div className="row">
          <div className="col-6">
            <img src={weatherData.icon} alt={weatherData.description} />
            <span className="temperature" id="temperature">
              {Math.round(weatherData.temperature)}
            </span>
            <span>
              {" "}
              <a href="/" id="cel-unit" className="active">
                °C
              </a>
            </span>{" "}
            |{" "}
            <span>
              <a href="/" id="fah-unit">
                {" "}
                ºF
              </a>
            </span>
          </div>
          <div className="col-6">
            <ul className="weatherInfo">
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Wind Speed: {weatherData.wind}m/s</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
