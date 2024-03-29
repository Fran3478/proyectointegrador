import Card from '../Card/Card';
import style from './Cards.module.css'

export default function Cards(props) {
   return (
      <div className={style.div}>
         {props.characters.map(character => 
            <Card
               key={character.id}
               id={character.id}
               name={character.name}
               status={character.status}
               species={character.species}
               gender={character.gender}
               origin={character.origin.name}
               image={character.image}
               onClose={props.onClose}
            />
         )}
      </div>
   )
}
