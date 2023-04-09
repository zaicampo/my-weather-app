import React, { useState } from "react";

export default function WeatherTemp(props) {
  const [unit, setUnit] = useState("celsius");
  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <div className="WeatherTemperature">
        <span className="temperature" id="temperature">
          {Math.round(props.celsius)}
        </span>
        <span className="unitTemperature">
          {" "}
          °C |{" "}
          <a href="/" id="cel-unit" onClick={showFahrenheit}>
            {" "}
            ºF
          </a>
        </span>
      </div>
    );
  } else {
    let fahrenheit = (props.celsius * 9) / 5 + 32;
    return (
      <div className="WeatherTemperature">
        <span className="temperature" id="temperature">
          {Math.round(fahrenheit)}
        </span>
        <span className="unit">
          {" "}
          <a href="/" id="cel-unit" onClick={showCelsius}>
            °C
          </a>
        </span>{" "}
        | <span> ºF</span>
      </div>
    );
  }
}
