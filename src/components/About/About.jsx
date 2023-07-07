import imgC from '../../assets/imgC.jpg'
import style from './About.module.css'
export default function About() {
    return (
        <div className={style.container}>
            <div className={style.containerHijo}>
                <img src={imgC}/>
                <div className={style.containerP}>
                    <p>Hola! Mi nombre es Francisco y estoy aprendiendo con Henry a programar en JavaScript + React + Redux, este es mi proyecto integrador</p>
                </div>
            </div>
        </div>
        
    )
}