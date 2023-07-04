import style from './Card.module.css'

export default function Card(props) {
   return (
      <div className={style.div}>
         <button onClick={() => {props.onClose(props.id)}}>X</button>
         <h2>{props.name}</h2>
         <h2>{props.status}</h2>
         <h2>{props.species}</h2>
         <h2>{props.gender}</h2>
         <h2>{props.name}</h2>
         <img src={props.image} alt={props.name} />
      </div>
   );
}
