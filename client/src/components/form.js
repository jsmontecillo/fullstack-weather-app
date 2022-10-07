import { useState } from "react";

const Form = (props) => {
  const [user, setUser] = useState({
    username: "",
    favorite: "",
  });

  //create functions that handle the event of the user typing into the form
  const handleNameChange = (event) => {
    const username = event.target.value;
    setUser((user) => ({ ...user, username }));
  };

  const handleFavoriteChange = (event) => {
    const favorite = event.target.value;
    setUser((user) => ({ ...user, favorite }));
  };

  //A function to handle the post request
  const postUser = (newUser) => {
    return fetch("http://localhost:1010/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
        props.addUser(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>Username</label>
        <input
          type="text"
          id="add-user-name"
          required
          value={user.username}
          onChange={handleNameChange}
        />
        <label>Favorite City</label>
        <input
          type="text"
          id="add-user-favorite"
          required
          value={user.favorite}
          onChange={handleFavoriteChange}
        />
      </fieldset>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
