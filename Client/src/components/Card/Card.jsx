import style from './Card.module.css'
import { Link } from 'react-router-dom';
import {addFav, removeFav } from '../../redux/actions/actions'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
//import { connect } from 'react-redux';


export default function Card(props) {
   const dispatch = useDispatch()
   const myFavorites = useSelector((state) => state.myFavorites)
   const [isFav, setIsFav] = useState(false)
   function handleFavorite(){
      if(isFav){
         setIsFav(false)
         dispatch(removeFav(props.id));
      } else {
         setIsFav(true)
         dispatch(addFav(props))
      }
   }
   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === props.id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);
   return (
      <div className={style.div}>
         {props.onClose ? <button className={style.close} onClick={() => {props.onClose(props.id)}}>X</button> : null}
         
         <Link to={`/detail/${props.id}`}>
            <div className={style.divImg}>
               <img className={style.img} src={props.image} alt={props.name} />
               <div className={style.divP}>
                  <p className={style.name}>{props.name}</p>
               </div>
            </div>
         </Link>
         
         <div className={style.conteiner}>
            <div className={style.divText}>
               <h2 className={style.status}> Status: {props.status}</h2>
               <h2 className={style.species}>Species: {props.species}</h2>
               <h2 className={style.gender}>Gender: {props.gender}</h2>
            </div>
            
            {
               isFav ? (
                  <button className={style.fav} onClick={handleFavorite}>❤️</button>
               ) : (
                  <button className={style.fav} onClick={handleFavorite}>🤍</button>
               )
            }
         </div>
      </div>
   );
}




// function Card(props) {
//    const [isFav, setIsFav] = useState(false)
//    function handleFavorite(){
//       if(isFav){
//          setIsFav(false)
//          props.removeFav(props.id)
//       } else {
//          setIsFav(true)
//          props.addFav(props)
//       }
//    }
//    useEffect(() => {
//       props.myFavorites.forEach((fav) => {
//          if (fav.id === props.id) {
//             setIsFav(true);
//          }
//       });
//    }, [props.myFavorites]);
//    return (
//       <div className={style.div}>
//          {props.onClose ? <button className={style.close} onClick={() => {props.onClose(props.id)}}>X</button> : null}
         
//          <Link to={`/detail/${props.id}`}>
//             <div className={style.divImg}>
//                <img className={style.img} src={props.image} alt={props.name} />
//                <div className={style.divP}>
//                   <p className={style.name}>{props.name}</p>
//                </div>
//             </div>
//          </Link>
         
//          <div className={style.conteiner}>
//             <div className={style.divText}>
//                <h2 className={style.status}> Status: {props.status}</h2>
//                <h2 className={style.species}>Species: {props.species}</h2>
//                <h2 className={style.gender}>Gender: {props.gender}</h2>
//             </div>
            
//             {
//                isFav ? (
//                   <button className={style.fav} onClick={handleFavorite}>❤️</button>
//                ) : (
//                   <button className={style.fav} onClick={handleFavorite}>🤍</button>
//                )
//             }
//          </div>
//       </div>
//    );
// }

// export function mapDispatchToProps(dispatch){
//    return {
//       addFav: function(character){
//          dispatch(addFav(character))
//       },
//       removeFav: function(id){
//          dispatch(removeFav(id))
//       }
//    }
// }

// export function mapStateToProps(globalState){
//    return {
//       myFavorites: globalState.myFavorites
//    }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Card)