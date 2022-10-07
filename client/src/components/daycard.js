import {useState} from 'react';
import './daycard.css';

const DayCard = ({data, day}) => {
    let date = data.dt_txt.split(' ');
    return (
        <div className="day-card">
            {day === 0 ? (
                <h1>Today</h1>
            ) : (
                day === 1 ? (
                    <h1>Tomorrow</h1>
                ) : (
                day === 2 ? (
                    <h1>Sunday</h1>
                ) : (
                day === 3 ? (
                    <h1>Monday</h1>
                ) : (
                    <h1>Tuesday</h1>
                )
                )
            )
            
            )}
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon" />
            <p>{date[0]}</p>
            <div className="temperature">
                <span>{data.main.temp_min}</span> - <span>{data.main.temp_max}</span>
            </div>
        </div>
    )
}

export default DayCard;