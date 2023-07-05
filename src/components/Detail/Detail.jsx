import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
export default function Detail() {
    const {id} = useParams()
    const [character, setCharacter] = useState({})
    useEffect(() => {
        axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
     }, [id]);
     
    return (
        <div>
            <img src={character.image} alt={character.name} />
            <h3>{character.name && character.name}</h3>
            <h5>{character.status && character.status}</h5>
            <section>
               <p> Species: {character.species && character.species}</p>
               <p>Gender: {character.gender && character.gender}</p>
               <p>Origin: {character.origin && character.origin.name}</p>
            </section>
        </div>
    )
}