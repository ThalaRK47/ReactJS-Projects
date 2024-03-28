import { useEffect} from "react";
import { useState } from "react";
// import { PropTypes } from "react";
import "./App.css";

// Images
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.png";
import thunderStormIcon from "./assets/thunder.png"
import mistIcon from "./assets/mist.png";

const WeatherDetails = ({icon,temp,city,country,lat,long,humidity,wind}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" />
      </div>
      <div className="temp basic">
        {temp}°C
      </div>
      <div className="location basic">
        {city}
      </div>
      <div className="country basic">
        {country}
      </div>
      <div className="coord">
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="long">longitude</span>
          <span>{long}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind} km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

/* WeatherDetails.propTypes ={
  icon:PropTypes.string.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  humidity:PropTypes.number.isRequired,
  wind:PropTypes.number.isRequired,
  lat:PropTypes.number.isRequired,
  long:PropTypes.number.isRequired,
}; */

function App() {
  let api_key = "68361asdfsdcnsdjkcnsdkjcdsdweiojdseodncsdjcnjxzncsdkjcsdjndj62f1a9bbbc";  // acivate open weather api
  const [text,setText] = useState("thoothukudi");

  const [icon,setIcon] = useState(cloudIcon);
  const [temp,setTemp] = useState(0);
  const [city,setCity] = useState("");
  const [country,setCountry] = useState("");
  const [lat,setLat] = useState(0);
  const [long,setLong] = useState(0);
  const [humidity,setHumidity] = useState(0);
  const [wind,setWind] = useState(0);

  const [cityNotFound,setCityNotFound] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  const weatherIconMap = {
      "01d": cloudIcon,
      "01n": cloudIcon,
      "02d": cloudIcon,
      "02n": cloudIcon, 	
      "03d": drizzleIcon,
      "03n": drizzleIcon, 	
      "04d": drizzleIcon,
      "04n": drizzleIcon, 	
      "09d": rainIcon,
      "09n": rainIcon, 	
      "10d": rainIcon,
      "10n": rainIcon, 	
      "11d": thunderStormIcon,
      "11n": thunderStormIcon,
      "13d": snowIcon,
      "13n": snowIcon, 	
      "50d": mistIcon,
      "50n": mistIcon,
  };

  const search = async () => {
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
      let res = await fetch(url);
      let data = await res.json();
      if (data.code==="404"){
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(()=>{
        if(data.sys.country === "IN"){
        return "india";
        }
        else{
          return data.sys.country;
      }});
      setLat(data.coord.lat);
      setLong(data.coord.lon);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon );
      setCityNotFound(false);
    }
    catch(error){
      console.error("An Error Occurred : ", error.message);
      setError("An Error occured while fetching weather data. ");
    }finally{
      // ()=>loading(false);
      setLoading(false);
    }
  
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      search();
    }
  };

  useEffect(function (){
    search();
  },[]);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text"
          className="cityInput"
          placeholder="Search City" 
          onChange={handleCity}
          value={text} onKeyDown={handleKeyDown}
          />
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="Search" />
          </div>
        </div>
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}

        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} humidity={humidity} wind={wind} />}

        <p className="copyright">
          Designed by <span>Ram Kumar S</span>
        </p>
      </div>
    </>
  );
}

export default App;
