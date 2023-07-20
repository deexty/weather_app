import axios from "axios";
import { useState } from "react";
import './App.css'
import {AiOutlineSearch} from 'react-icons/ai'

function App() {
  const [inputValue, setInputValue] = useState("");
  const [dataClima, setDataClima] = useState(null);
  const [estado, setEstado] = useState("Rain");
  const inputSearch = document.querySelector("#inputSearch");

  const buscaData = (dt) =>{
    const data = new Date(dt * 1000);
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'medium',
      timeStyle: 'short',
  });
    return dataFormatada.format(data);
  }

  const condicoes = {
    "Rain": {
      "name": "Rain",
      "cor": "#39576D",
    },
    "Thunderstorm": {
      "name": "Rain",
      "cor": "#47396D",
    },
    "Drizzle": {
      "name": "Rain",
      "cor": "#4A728F",
    },
    "Snow": {
      "name": "Rain",
      "cor": "#A9A9A9",
    },
    "Atmosphere": {
      "name": "Rain",
      "cor": "#6D5D5D",
    },
    "Clouds": {
      "name": "Rain",
      "cor": "#808080",
    },
    "Clear":{
      "name": "Claer",
      "cor": "#81ADBF",
    }
  }

  const fetchApiClima = async () =>{
    if (inputValue !== "") {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=50921fac033c806847e83225ba2ec3b9&lang=pt_br`)
      .then(res => {
        setDataClima(res.data);
        setEstado(res.data.weather[0].main);
      })
      .catch(
        erro => {
          const input = document.querySelector(".inputContainer")
          input.style.transition = "none";
          input.style.backgroundColor = "#E04C4C";
          setTimeout(() =>{
            input.style.transition = "1.5s";
            input.style.backgroundColor = condicoes[estado].cor;
          },100)
        }
      )
    }
  }

  return (
    <div className="AppBodyContainer">
      <section className="AppContainer">
        <div className="inputContainer" style={{backgroundColor: condicoes[estado].cor}}>
          <div onClick={() => {
            if (dataClima === null){
              inputSearch.parentNode.style.top = "0px"
              setTimeout(() =>{
                fetchApiClima()
                inputSearch.parentNode.style.borderRadius = '10px 10px 0 0'
              },500)
            }else{
              fetchApiClima()
            }
          }}>
            <AiOutlineSearch></AiOutlineSearch>
          </div>
          <input autoComplete="off" id="inputSearch" placeholder="Pesquisar cidade" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) =>{
            if(e.key === "Enter"){
              if (dataClima === null){
                inputSearch.parentNode.style.top = "0px"
                setTimeout(() =>{
                  fetchApiClima()
                  inputSearch.parentNode.style.borderRadius = '10px 10px 0 0'
                },400)
              }else{
                fetchApiClima()
              }
            }
          }}></input>
        </div>
        {dataClima && (
          <section className="infoContainer" >
            <div className="topInfo" style={{backgroundColor: condicoes[estado].cor}}>
              <h1>{dataClima.name}</h1>
              <p>{buscaData(dataClima.dt)}</p>
              <p style={{lineHeight: '1rem'}}>{dataClima.weather[0].description}</p>
              <img src={`/assets/icons/${dataClima.weather[0].main}.svg`} alt={`${dataClima.weather[0].main} icon`}></img>
              <ul>
                <li>
                  <img src="/assets/icons/humidityIcon.svg" alt="icon humidade"></img>
                  <p>{`${dataClima.main.humidity}%`}</p>
                </li>
                <li>
                  <img src="/assets/icons/temperatureIcon.svg" alt="icon temperatura"></img>
                  <p>{`${dataClima.main.temp}°`}</p>
                </li>
                <li>
                  <img src="/assets/icons/windIcon.svg" alt="icon velocidade dos ventos"></img>
                  <p>{`${dataClima.wind.speed}m/s`}</p>
                </li>
              </ul>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

export default App;
