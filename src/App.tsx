import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListView from "./ListView";
import Gallery from "./GalleryView";
import Detail from "./DetailView";
import axios from "axios";
import React, { useState, useEffect } from "react";


function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon/';

  const [data, setData] = useState<any>([]);
  const fetchData = async () => {
    let res = await axios
      .get(url, { params: { limit: 300 } })
      .then((res) => {
        return res.data.results;
      })
      .then(async (res) => {
        let result = await Promise.all(
          res.map(async (entry: any) => {
            let stat: any = await axios.get(entry.url).then((res) => {
              return res.data;
            });
            const parts = entry.url.split("/");
            const index = parts[parts.length - 2];
            let num = index.toString()
            while (num.length < 4) {
              num = '0' + num;
            }
            entry.number = '#' + num
            entry.index = index
            entry.details = stat;
            return entry;
          })
        );
        return result;
      });
    setData(res);
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route index element={<ListView dataInit={data} />} />
        <Route path="gallery" element={<Gallery dataInit={data} />} />
        <Route path="details/:index" element={<Detail dataInit={data}/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// // import logo from './src/logo.svg';
// import './App.css';
// import { useEffect, useState, Component } from 'react';
// import axios, { isCancel, AxiosError } from 'axios';
// // import Tabs from "./TabComponents/Tabs";
// // import { BrowserRouter as Router, Route, Link } from "react-router-dom";


// const url = 'https://pokeapi.co/api/v2/pokemon';
// // const url = "https://jsonplaceholder.typicode.com/users";

// const fetcher = async () => {
//   let response = await axios({
//     method: 'GET',
//     url: 'https://pokeapi.co/api/v2/pokemon',
//     params: {
//       limit: 20,
//     }
//   }).then((res) => res.data)

//   return response;
// };

// class Card extends Component {
// }

// function App() {
//   const [data, setData] = useState<any>({});
//   useEffect(() => {
//     fetcher().then((response) => {
//       console.log(response);
//       setData(response);
//     });
//   }, [])

//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>Pokédex</p>
//       </header>
//       <Tabs />
//       <center>
//         {data.results?.map((dataObj: any, index: any) => {
//           return (
//             <div key={index}

//               style={{
//                 width: "15em",
//                 backgroundColor: "#CD8FFD",
//                 padding: 2,
//                 borderRadius: 10,
//                 marginBlock: 10,
//               }}
//             >
//               <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`} alt="icons" />
//               <span style={{ fontSize: 20, color: 'white'}}>{dataObj.name}</span>
//             </div>
//           );
//         })}
//       </center>
//     </div>
//   );
// }

// export default App;
