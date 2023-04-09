import React from "react";
import FormattedDate from "./FormatDate";
import WeatherTemp from "./WeatherTemp";

export default function WeatherInfo(props) {
  return (
    <div>
      <h1 id="city-name">{props.data.city}</h1>
      <ul className="nowInfo">
        <li id="date">
          <FormattedDate date={props.data.date} />
        </li>
        <li className="text-capitalize" id="weather-description">
          {props.data.description}
        </li>
      </ul>
      <div className="row">
        <div className="col-6">
          <img src={props.data.icon} alt={props.data.description} />
          <span>
            <WeatherTemp celsius={props.data.temperature} />
          </span>
        </div>
        <div className="col-6">
          <ul className="weatherInfo">
            <li>Humidity: {props.data.humidity}%</li>
            <li>Wind Speed: {props.data.wind}m/s</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
