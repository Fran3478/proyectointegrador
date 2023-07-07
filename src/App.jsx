import style from'./App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Detail from './components/detail/Detail';
import Nav from './components/Nav/Nav'
import Form from './components/Form/Form';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Favorites from './components/Favorites/Favorites';

function App() {
   const [characters, setCharacters] = useState([])
   const location = useLocation()
   const navigate = useNavigate()
   const [access, setAccess] = useState(false)
   const EMAIL = 'franciscohv95@gmail.com'
   const PASSWORD = 'asd123'
   function login(userData) {
      if(userData.email === EMAIL && userData.password === PASSWORD) {
         setAccess(true)
         navigate('/home')
      } else {
         window.alert('Email o Password incorrectos')
      }
   }
   function logout() {
      setAccess(false)
      navigate('/')
   }
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
   useEffect(() => {
      !access && navigate('/');
   }, [access]);
   return (
      <div className='App'>
         {location.pathname !== '/' && (<Nav onSearch={onSearch} logout={logout}/>)}
         <Routes>
            <Route path='/' element={<Form className={style.form} login={login}/>} />
            <Route path={"/home"} element={<Home characters={characters} onClose={onClose}/>}/>
            <Route path={"/about"} element={<About/>}/>
            <Route path={"/detail/:id"} element={<Detail/>}/>
            <Route path={"/favorites"} element={<Favorites/>}/>
         </Routes>
      </div>
   );
}

export default App;