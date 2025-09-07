export default function WeatherToday({ town, temp, weather }) {
  function getIcon(condition) {
    if (condition === "Partly Cloudy") return "☁️";
    if (condition === "Sunny") return "☀️";
    if (condition === "Patchy rain nearby") return "🌦️";
    if (condition === "Moderate rain") return "🌧️";
  }

  return (
    <div className="today">
      <div>
        <p className="icon">{getIcon(weather)}</p>
      </div>
      <div className="weather-info">
        <p className="day">Today</p>
        <h1 className="town">{town}</h1>
        <p className="temperature">Temperature: {temp}°C</p>
        <p className="weather">{weather}</p>
      </div>
    </div>
  );
}
