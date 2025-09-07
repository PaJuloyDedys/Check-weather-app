import WeatherForecastAll from "./components/WeatherForecastAll";
import WeatherInput from "./components/WeatherInput";
import WeatherToday from "./components/WeatherToday";
import { useState, useEffect } from "react";
import bgSunny from "./images/weatherSunshine.jpg";
import bgCloudy from "./images/weatherCloudy.jpg";
import bgClear from "./images/weatherClear.jpg";
import bgRain from "./images/weatherRain.jpg";

export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const BG = { sunny: bgSunny, cloudy: bgCloudy, clear: bgClear, rain: bgRain };

  function pickBg(text = "") {
    const t = text.toLowerCase();
    if (t.includes("rain")) return BG.rain;
    if (t.includes("cloud") || t.includes("mist")) return BG.cloudy;
    if (t.includes("clear")) return BG.clear;
    if (t.includes("sunny")) return BG.sunny;
    return BG.sunny;
  }

  // Get geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
          alert(err.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // Fetch weather
  useEffect(() => {
    if (!location) return;

    async function getWeather() {
      try {
        let query;
        if (typeof location === "string") {
          query = location; // city
        } else {
          query = `${location.latitude},${location.longitude}`; // coords
        }

        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=a14c33ac44904b5292f85116250709&q=${query}&days=5&aqi=no&alerts=no`
        );
        const data = await response.json();

        setWeather(data);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      }
    }

    getWeather();
  }, [location]);

  // Background update
  useEffect(() => {
    if (!weather?.current?.condition?.text) return;
    const url = pickBg(weather.current.condition.text);
    document.body.style.backgroundImage = `url(${url})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }, [weather]);

  // Forecast icons
  function getIcon(i) {
    const condition =
      weather?.forecast?.forecastday[i]?.day?.condition?.text?.toLowerCase() ||
      "";

    if (condition.includes("sunny")) return "☀️";
    if (condition.includes("patchy rain") || condition.includes("rain"))
      return "🌦️";
    if (condition.includes("moderate rain")) return "🌧️";
    if (condition.includes("cloud")) return "☁️";
    return "🌍";
  }

  function handleSubmitWeather(e, cityOrCoords) {
    e.preventDefault();
    if (!cityOrCoords) return;

    if (cityOrCoords.includes(",")) {
      const [lat, lon] = cityOrCoords.split(",");
      setLocation({
        latitude: parseFloat(lat.trim()),
        longitude: parseFloat(lon.trim()),
      });
    } else {
      setLocation(cityOrCoords.trim());
    }
  }

  const iconToday = getIcon(0);

  return (
    <div>
      <WeatherInput handleSubmitWeather={handleSubmitWeather} />
      <div className="weather-cont">
        <WeatherToday
          temp={weather?.forecast?.forecastday[0]?.day?.avgtemp_c}
          town={weather?.location?.name}
          weather={weather?.current?.condition?.text}
          iconToday={iconToday}
        />
        <WeatherForecastAll weather={weather} getIcon={getIcon} />
      </div>
    </div>
  );
}
