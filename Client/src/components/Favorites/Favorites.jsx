import { connect, useDispatch } from "react-redux"
import Card from "../Card/Card"
import style from './Favorites.module.css'
import { filterCards, orderCards, resetFav } from "../../redux/actions/actions"
import { useState } from "react"

function Favorites(props) {
    const dispatch = useDispatch()
    const [aux, setAux] = useState(false)
    function handleOrder(event){
        dispatch(orderCards(event.target.value))
        setAux(!aux)
    }
    function handleFilter(event){
        dispatch(filterCards(event.target.value))
    }
    function handleReset(event){
        dispatch(resetFav())
    }

    return <div>
        <div className={style.Selects}>
        <select onChange={handleOrder}>
            <option value='A'>Ascendente</option>
            <option value='D'>Descendente</option>
        </select>
        <select onChange={handleFilter}>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Genderless'>Genderless</option>
            <option value='unknown'>Unknown</option>
        </select>
        <button onClick={handleReset}>Reset</button>
    </div>
    
    <div className={style.div}>
        {props.myFavorites?.map(character => (
            <Card
            key={character.id}
            id={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            gender={character.gender}
            origin={character.origin.name}
            image={character.image}
            />
        ))}
    </div>
    </div>
    
}
export function mapStateToProps(state){
    return {
        myFavorites: state.myFavorites
    }
}

export default connect(mapStateToProps)(Favorites)