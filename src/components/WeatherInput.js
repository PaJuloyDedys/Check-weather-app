import { useState } from "react";

export default function WeatherInput({ handleSubmitWeather }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <form onSubmit={(e) => handleSubmitWeather(e, inputValue)}>
      <input
        className="weather-city"
        type="text"
        placeholder="Enter a City..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}
