import { useState, useEffect, useReducer } from "react";
import Form from "./form";
import './users.css';
import DayCard from './daycard';

function Users() {
  const [users, setUsers] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    fetch("http://localhost:1010/api/favorites")
      .then((response) => response.json())
      .then((users) => {
            setUsers(users);
          });
  }, []);

  const addUser = (newUser) => {
    //console.log(newStudent);
    //postStudent(newStudent);
    console.log(users);
    setUsers((users) => [...users, newUser]);
    console.log(users);
  };

  const handleFavorite = (favorite, id) => {
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
    setSelectedId(id);
  }

  return (
    <div className="users">
      <h2>Users</h2>
        {users.map((user) => {
          return (
          <div className="user-card" key={user.id}>
            <span style={{marginLeft: "-1100px"}}>
              {user.username} <button>Edit</button> <button>Delete</button>
            </span>
            <span style={{float: "right", marginRight: "20px"}} >
            &#9829; {user.favorite} <span onClick={() => handleFavorite(user.favorite, user.id)}>&#8595;</span>
            </span>
            {selected ? (
              <>
                <div className={selectedId === user.id ? 'five-days' : 'hide'}>
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
        <h2>Add User</h2>
      <Form addUser={addUser}/>
    </div>
  );
}

export default Users;
