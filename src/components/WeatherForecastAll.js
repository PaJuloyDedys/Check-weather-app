import WeatherForecastOneDay from "./WeatherForecastOneDay";

export default function WeatherForecastAll({ weather, getIcon }) {

  function getDayName(day) {
    const date = new Date(day);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  const allForecast = weather?.forecast.forecastday;
  return (
    <div className="forecast">
      {
        allForecast.map((fc, i) =>
        (<WeatherForecastOneDay
          key={i}
          day={getDayName(fc.date)}
          sun={getIcon(i + 1)}
          temp={fc.day.avgtemp_c}
        />)
        )
      }
    </div>
  );
}
