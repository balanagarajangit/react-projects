import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Weather.css'
// Images
import drizzleIcon from '/drizzle.png';
import humidityIcon from '/humidity.png';
import windIcon from '/wind.png'
import rainIcon from '/rain.png';
import snowIcon from '/snow.png';
import sunIcon from '/sun.png';

const WeatherDetails = ({ icon, temp, city, country, lat, log,
    humidity, wind }) => {
    return (
        <>
            <div className="image">
                <img src={icon} alt="image" />
            </div>
            <div className="temp">{temp}°C</div>
            <div className="location">{city}</div>
            <div className="country">{country}</div>
            <div className="cord">
                <div>
                    <span className="lat">Latitude</span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className="log">Latitude</span>
                    <span>{log}</span>
                </div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidityIcon} alt="humidityIcon" className='icon' />
                        <div className="data">
                            <div className="humidity-percent">{humidity}%</div>
                            <div className="text">humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={windIcon} alt="windIcon" className='icon' />
                        <div className="data">
                            <div className="wind-percent">{wind} km/h</div>
                            <div className="text">wind speed</div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export const Weather = () => {
    let APIkey = "777b782028e7826e840d4eea7057602e"
    const [icon, setIcon] = useState(snowIcon);
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("Madurai");
    const [country, setCountry] = useState("IN");
    const [lat, setLat] = useState(0);
    const [log, setLog] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [text, setText] = useState("chennai")
    const [cityNotFound, setCityNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const weatherIconMap = {
        "01d": sunIcon,
        "01n": sunIcon,
        "02d": windIcon,
        "o2n": windIcon,
        "03d": drizzleIcon,
        "03n": drizzleIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,

    }

    const search = async () => {
        setLoading(true);
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${APIkey}&units=Metric`;


        try {
            let res = await fetch(url);
            let data = await res.json();
            if (data.cod === "404") {
                console.error("city not found");
                setCityNotFound(true);
                setLoading(false);
                return;

            }
            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemp(Math.floor(data.main.temp))
            setCity(data.name);
            setCountry(data.sys.country);
            setLat(data.coord.lat);
            setLog(data.coord.lon)
            const weatherIconCode = data.weather[0].icon;
            setCityNotFound(false);
            setIcon(weatherIconMap[weatherIconCode] || sunIcon)
        } catch (error) {
            console.error("An error occurred:", error.message);
            setError("An error occurred while fetching weather data.")
        } finally {
            setLoading(false);
        }
    }

    const handleCity = (e) => {
        setText(e.target.value);
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search();
        }
    }
    useEffect(function () {
        search();
    }, [])
    return (
        <>
            <div className='container'>
                <div className='input-container'>
                    <input type="text"
                        className='cityInput'
                        placeholder='search City'
                        onChange={handleCity}
                        value={text}
                        onKeyDown={handleKeyDown} />
                    <div className="search-icon"
                        onClick={() => search()}>
                        <img src="/search.png" alt="" />
                    </div>

                </div>
                {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city}
                    country={country} lat={lat} log={log} wind={wind} humidity={humidity} />}


                {loading && <div className="loading-message">Loading....</div>}
                {cityNotFound && <div className="city-not-found">City not found</div>}
            </div>

        </>
    )
}

WeatherDetails.propTypes = {
    icon: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    log: PropTypes.number.isRequired,
}