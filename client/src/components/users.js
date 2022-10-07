import { useState, useEffect, useReducer } from "react";
import Form from "./form";
import './users.css';
import DayCard from './daycard';

function Users() {
  const [users, setUsers] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    fetch("http://localhost:1010/api/favorites")
      .then((response) => response.json())
      .then((users) => {
            setUsers(users);
          });
  }, []);


  const handleFavorite = (favorite) => {
    fetch(`http://localhost:1010/weather/${favorite}`)
    .then((response) => { 
        if (response.ok) { // Checks server response (if there is one) 
            return response.json();
        } else {
            throw new Error("Bad response");
        }})
    .then((data) => 
        {
            console.log(data);
            const filtered = data.list.filter((i, index) => {
                return index % 8 === 0 || index === 0;
            })
            console.log(filtered);
            setWeatherData(filtered);
            console.log(data.list[0].weather[0].main);
    })
    setSelected(!selected);
  }
  return (
    <div className="users">
      <h2>Users</h2>
        {users.map((user) => {
          return (
          <div className="user-card" key={user.id}>
            <span style={{marginLeft: "-1200px"}}>
              {user.username}
            </span>
            <span style={{float: "right", marginRight: "20px"}} onClick={() => handleFavorite(user.favorite)}>
              {user.favorite} &#xf358;
            </span>
            {selected ? (
              <>
                <div className="five-days">
                  {weatherData.map((day, index) => {
                    console.log(day);
                    return <DayCard data={day} day={index} />
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          );
          })}
      {/*<Form addStudent={addStudent} />*/}
    </div>
  );
}

export default Users;
