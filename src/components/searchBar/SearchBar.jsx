import { useState } from "react";
import style from './SearchBar.module.css'

export default function SearchBar(props) {
   const [id, setId] = useState('')
   function handleChange(event) {
      setId(event.target.value)
   }
   
   return (
      <div className={style.container}>
         <input type='search' placeholder="Busca un personaje..." onChange={handleChange} value={id}/>
         <button onClick={() => {props.onSearch(id)}}>Agregar</button>
      </div>
   );
}
