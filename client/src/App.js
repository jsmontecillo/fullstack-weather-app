import "./App.css";
import Weather from './components/weather';
import Users from './components/users';
import dog from './dog.png';
import speech from './speech.png';
import styled from 'styled-components';
import {useState} from 'react';

const Tab = styled.button`
  width: 100%;
  font-size: 20px;
  font-family: Courier New;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid #4444dd;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const types = ['Weather', 'Users', 'Contact Us'];
const typeTags = [<div className="weather-tab"><h1 style={{textShadow: "2px 2px 4px #000000"}}>Hello, World!</h1><img src={dog} alt="this is fine dog meme" style={{position: "absolute", marginTop: "200px", marginLeft: "-650px"}}/><Weather /></div>, <div className="user-tab"><Users /></div>,       <main>
<h1>Hello, World!</h1>
</main>];

function App() {
  const [active, setActive] = useState(types[0]);
  const [data, setData] = useState("");
  return (
    <div className="App">
      <ButtonGroup>
        {types.map((type, index) => {
          console.log(typeTags[index])
          return (<Tab
            key={type}
            active={active === type}
            onClick={() => {setActive(type); setData(typeTags[index])}}
          >
            {type}
          </Tab>);
})}
      </ButtonGroup>
      <div style={{marginTop: "0px"}}> {data} </div>
    </div>
  );
}

export default App;
