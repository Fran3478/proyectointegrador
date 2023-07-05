import './App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Detail from './components/detail/Detail';
import Nav from './components/Nav/Nav'
import { useState } from 'react';
import axios from 'axios'
import { Routes, Route } from 'react-router-dom';

function App() {
   const [characters, setCharacters] = useState([])
   function onSearch(id) {
      let found = false
      characters.forEach(character => {
         if(character.id === parseInt(id)) {
            found = true
         }
      })
      if(!found) {
         axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               window.alert('¡No hay personajes con este ID!');
            }
         });
      } else {
         window.alert('ID repetido!');
      }
      
   }
   function onClose(id) {
      setCharacters(characters.filter(character => character.id !== parseInt(id)))
   }
   return (
      <div className='App'>
         <Nav onSearch={onSearch}/>
         <Routes>
            <Route path={"/home"} element={<Home characters={characters} onClose={onClose}/>}/>
            <Route path={"/about"} element={<About/>}/>
            <Route path={"/detail/:id"} element={<Detail/>}/>
         </Routes>
      </div>
   );
}

export default App;