import style from'./App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
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
   function login(userData) {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
         const { access } = data;
         setAccess(access);
         access && navigate('/home');
      });
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
         axios(`http://localhost:3001/rickandmorty/character/${id}`).then((response) => {
            if (response.data.name) {
               setCharacters((oldChars) => [...oldChars, response.data]);
            } 
            // else {
            //    window.alert(response.data.error);
            // }
         })
         .catch((err) => alert(err.response.data.error))
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