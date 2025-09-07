export default function WeatherForecastOneDay({ day, sun, temp }) {
  return (
    <div className="forecast-box">
      <p className="day-cart">{day}</p>
      <p className="icon-cart">{sun}</p>
      <p className="temp-cart">{temp}°C</p>
    </div>
  );
}
