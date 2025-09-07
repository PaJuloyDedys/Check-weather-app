import { useEffect, useState } from "react";

export default function WeatherInput({ handleSubmitWeather }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inputValue.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=a14c33ac44904b5292f85116250709&q=${inputValue}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Error while fetching cities suggestions: ", err);
      }

    }

    const debounce = setTimeout(fetchCities, 1000);
    return () => clearTimeout(debounce);
  }, [inputValue, inputValue.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue([]);
    setSuggestions([]);
    handleSubmitWeather(e, inputValue)
  }


  return (
    <form className="flex justify-center items-center" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="weather-city"
        type="text"
        placeholder="Enter a City..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {suggestions.length > 0 && (
        <ul className="absolute bg-white z-[100] top-[12rem] border rounded w-full max-h-48 max-w-72 overflow-y-auto shadow">
          {suggestions.map((city) => (
            <li
              key={city.id || city.name}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
              onClick={(e) => {
                setInputValue(city.name);
                handleSubmit(e)
              }
              }
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
