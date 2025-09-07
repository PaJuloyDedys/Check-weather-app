import WeatherForecastOneDay from "./WeatherForecastOneDay";

export default function WeatherForecastAll({ weather, getIcon }) {
  // console.log(weather?.forecast.forecastday[1].date);

  function getDayName(day) {
    const date = new Date(day);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  // console.log(weather?.forecast.forecastday[1].day.condition.text);
  // console.log(weather?.forecast.forecastday[2].day.condition.text);
  // console.log(weather?.forecast.forecastday[3].day.condition.text);
  // console.log(weather?.forecast.forecastday[4].day.condition.text);
  // const getDay = getDayName(weather?.forecast.forecastday[1].date);
  // console.log(getDay); ☁️ 🌤️ ☀️ 🌦️ ⛈️ 🌧️

  return (
    <div className="forecast">
      <WeatherForecastOneDay
        day={getDayName(weather?.forecast.forecastday[1].date)}
        sun={getIcon(1)}
        temp={weather?.forecast.forecastday[1].day.avgtemp_c}
      />
      <WeatherForecastOneDay
        day={getDayName(weather?.forecast.forecastday[2].date)}
        sun={getIcon(2)}
        temp={weather?.forecast.forecastday[2].day.avgtemp_c}
      />
      <WeatherForecastOneDay
        day={getDayName(weather?.forecast.forecastday[3].date)}
        sun={getIcon(3)}
        temp={weather?.forecast.forecastday[3].day.avgtemp_c}
      />
      <WeatherForecastOneDay
        day={getDayName(weather?.forecast.forecastday[4].date)}
        sun={getIcon(4)}
        temp={weather?.forecast.forecastday[4].day.avgtemp_c}
      />
    </div>
  );
}
