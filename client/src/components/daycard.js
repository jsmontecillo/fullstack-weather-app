import {useState} from 'react';
import './daycard.css';

const DayCard = ({data}) => {
    console.log(data)
    return (
        <div className="day-card">
            <p>{data.dt_txt}</p>
        </div>
    )
}

export default DayCard;