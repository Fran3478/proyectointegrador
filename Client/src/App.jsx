import style from'./App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav'
import Form from './components/Form/Form';
import FormSignUp from './components/Form/FormSignUp';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Favorites from './components/Favorites/Favorites';

function App() {
   const [characters, setCharacters] = useState([])
   const location = useLocation()
   const navigate = useNavigate()
   const [access, setAccess] = useState(false)
   
   async function login(userData) {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      try {
         const {data} = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;
         setAccess(access);
         access && navigate('/home');
      } catch (error) {
         alert(error.message)
      }
      
   }
   async function signUp(userData) {
      const URL = 'http://localhost:3001/rickandmorty/login/'
      try {
         const {data} = await axios.post(URL, userData)
         if(data[data.length-1] === true) {
            navigate('/')
         } else {
            alert(`El email: ${userData.email} ya esta registrado`)
         }
      } catch (error) {
         alert(error.message)
      }
   }
   function logout() {
      setAccess(false)
   }
   async function onSearch(id) {
      let found = false
      characters.forEach(character => {
         if(character.id === parseInt(id)) {
            found = true
         }
      })
      if(!found) {
         try {
            const response = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
            if (response.data.name) {
               setCharacters((oldChars) => [...oldChars, response.data]);
            } 
            else {
               alert(response.data.error);
            }
         } catch (err) {
            alert(err.response.data.error)
         }
      } else {
         window.alert('ID repetido!');
      }
      
   }
   function onClose(id) {
      setCharacters(characters.filter((character) => character.id !== parseInt(id)))
   }

   useEffect(() => {
      if(location.pathname !== '/signup' && location.pathname !== '/' && access === false) {
         navigate('/')
      }
   }, [access]);

   return (
      <div className='App'>
         {(location.pathname !== '/' && location.pathname !== '/signup') ? (<Nav onSearch={onSearch} logout={logout}/>) : null}
         <Routes>
            <Route path='/' element={<Form login={login}/>} />
            <Route path='/signup' element={<FormSignUp signUp={signUp}/>} />
            <Route path={"/home"} element={<Home characters={characters} onClose={onClose}/>}/>
            <Route path={"/about"} element={<About/>}/>
            <Route path={"/detail/:id"} element={<Detail/>}/>
            <Route path={"/favorites"} element={<Favorites/>}/>
         </Routes>
      </div>
   );
}

export default App;