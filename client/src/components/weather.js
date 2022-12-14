import React, {useState} from 'react';
import "./weather.css";
import DayCard from './daycard.js';
import Users from './users.js';

const Weather = () => {
    let today = new Date();
    let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let hr = today.getHours();
    console.log(hr)
    const [weatherData, setWeatherData] = useState(null);
    const [checkData, setCheckData] = useState(true);
    const [city, setCity] = useState("Your City");

    const handleSubmit =  (e) => {
        e.preventDefault();
        fetch(`http://localhost:1010/weather/${city}`)
        .then((response) => { 
            if (response.ok) { // Checks server response (if there is one) 
                return response.json();
            } else {
                throw new Error("Bad response");
            }})
        .then((data) => 
            {
                console.log(data);
                setCheckData(data);
                const filtered = data.list.filter((i, index) => {
                    return index % 8 === 0 || index === 0;
                })
                console.log(filtered);
                setWeatherData(filtered);
                console.log(data.list[0].weather[0].main);
                switch(filtered[0].weather.main) {
                    case "Clouds":
                        document.getElementsByTagName('body')[0].style.backgroundImage = "url('https://wallpaper.dog/large/10981227.jpg')";
                    break;
                    case "Clear":
                        document.getElementsByTagName('body')[0].style.backgroundImage = "url('https://wallpapers.com/images/hd/hd-blue-sky-wallpaper-full-hd-picture-mvehfqz6w2ges2dj.jpg')";
                    break;
                    case "Rain":
                        document.getElementsByTagName('body')[0].style.backgroundImage = "url('https://www.pixelstalk.net/wp-content/uploads/2016/03/Free-cloud-wallpaper-HD.jpg')"
                    break;
                    case "Snow":
                        document.getElementsByTagName('body')[0].style.backgroundImage = "url('https://wallpaperaccess.com/full/435550.jpg')";
                    break;
                    case "Drizzle":
                        document.getElementsByTagName('body')[0].style.backgroundImage = "url('https://images.pexels.com/photos/268917/pexels-photo-268917.jpeg?cs=srgb&dl=pexels-pixabay-268917.jpg&fm=jpg')";
                    break;
                    case "Thunderstorm":
                        document.getElementsByTagName('body')[0].style.backgroundImage = "url('https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg')";
                    break;
                }
            }) 
    
}

/*{
    "dt":1665090000,
    "main": {
        "temp": 64.83,
        "feels_like": 64.63,
        "temp_min": 64.83,
        "temp_max": 66.67,
        "pressure": 1028,
        "sea_level": 1028,
        "grnd_level": 1012,
        "humidity": 77,
        "temp_kf": -1.02
    },
    "weather":[{
        "id":800,
        "main":"Clear",
        "description":"clear sky",
        "icon":"01n"
    }],
    "clouds": {
        "all":0
    },
    "wind": {
        "speed": 3.47,
        "deg":74,
        "gust":5.3
    },
    "visibility": 10000,
    "pop":0,
    "sys": {
        "pod":"n"
    },
    "dt_txt": "2022-10-06 21:00:00"
}
*/
console.log(weatherData);
console.log(city);
  return (
    <>
        <div className="">
            <div>
                <form onSubmit={handleSubmit} >
                    <input 
                    type="text" 
                    placeholder="New York"
                    id="city"
                    name="city"
                    onChange={event => setCity(event.target.value)}
                    value={city}
                      />
                    <button type="submit">Get Weather</button>
                </form>
            </div>
            { checkData.cod  === "404" ? (
                <h1>Enter a valid city</h1>
            ) : ( weatherData ? (
                <>
                <div className="five-days">
                    {weatherData.map((day, index) => {
                        console.log(day);
                        return <DayCard data={day} day={index} />
                    })}
                </div>
                <div className="city">
                    <p style={{fontSize: "100px", marginTop: "100px", marginLeft: "550px", textShadow: "2px 2px 4px #000000", color:"white"}}>{city}</p>
                </div>
                </>
            ) : (
                <p style={{fontSize: "30px"}}>Welcome!</p>
                )
            )}
        </div>
        </>

)}

export default Weather;