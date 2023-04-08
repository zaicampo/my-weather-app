import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormatDate";
import "./Weather.css";

export default function Weather(props) {
  const [ready, setReady] = useState(false);
  const [weatherData, setWeatherData] = useState({ ready: false });
  function handleResponse(response) {
    setWeatherData({
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
    });
    setReady(true);
  }

  if (ready) {
    return (
      <div className="weather-app">
        <form id="city-form">
          <div className="row">
            <div className="col-9" id="city-search">
              <input
                id="city-input"
                type="search"
                placeholder="Enter a city"
                autoFocus="on"
                autoComplete="off"
                className="form-control search-input"
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
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAjdJREFUeNrtmsGtgzAMhjtCRmAERsgIHYFjjx2BERiBEToCI+TaG2+DbJBnKj8pD1Eaiv8AwpX+C1Ap/hzHjpNLCOFyZl0UgAJQAApAASgABaAAFIACODEA9C/83AypIrUkRwpv5Pib4dsCNp5cAMgIS3rMGPxJw3/t4QDQoEtSt8LwsTpJEFAAAONjNUM4HSIEOO7vJC8Mwa2FkHURZBDSM2KAWu4CwPP5LEgtyZMCy/OzIgKBgGA2BUAGliPDxxreldFM2EU4JAOgwRtSPeHdmj0/Z3z8fcEQasTCiATgEgxMURvNAkR2sOIA2MtBSH60KNbC4dAhAHhBACFDdrBiADj2A0DI7PA4AgB0dihWAaBBXUk92Hhkdqi+BsDGh8ySzg7tGgD9BgC88FrgvgKQIeY/ZgepxXB3m6EFm6bm7ADqQwDggSLUHQVA2KG6P50JQJ+a96UBuC08OwqRerOWGPftkUa7Oc/GrTBKo5b0mEivwzOLAlABjb8v6EY1CXVGgwCAampUqZ5NNP5fuS1aB6w87Zn1PG+XpStOKw3AIro5IONfM0e8EhRsZFxz7EYRACRmgQc0YPMAENrAdJk6UBgAKwojz/W/yQUgXgilARguS5dUd2Yir+foPzSQ7TAfifdLOjZvzhSzQID0A3gmuJTDzIQzRXg4IC9IvFsY68jzWxr/qgvQV2TsRJ1gwMXOIuW+JNWhjtx2DWCDE6fvAOhNUQWgABSAAlAACkABKAAFoABOp1+6Bd0LJ+BorgAAAABJRU5ErkJggg=="
              alt={weatherData.description}
            />
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
    const apiKey = "df0a2843c2fa36a73178f1e35e3378f6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultcity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
  }
}
