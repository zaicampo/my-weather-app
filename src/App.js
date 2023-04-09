import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <section className="weather">
        <Weather defaultcity="Barrancabermeja" />
      </section>
      <footer className="codeInfo">
        <a href="https://github.com/zaicampo/my-weather-app">
          Open source code
        </a>
        <span>{""} by Zaira Campo</span>
      </footer>
    </div>
  );
}

export default App;
