import './App.css';
import Card from './components/card/Card';
import Cards from './components/cards/Cards';
import Nav from './components/nav/Nav'
import { useState } from 'react';
import axios from 'axios'

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
         <Cards characters={characters} onClose={onClose} />
      </div>
   );
}

export default App;