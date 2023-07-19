import SearchBar from '../SearchBar/SearchBar';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css'

function Nav(props) {
    return (
        <div className={style.nav}>
            <div className={style.buttonContainer}>
                <div className={style.linkContainer}>
                    <NavLink to={"/home"}>
                        <button className={style.btn}>Home</button>
                    </NavLink>
                    <NavLink to={"/favorites"}>
                        <button className={style.btn}>Favorites</button>
                    </NavLink>
                    <NavLink to={"/about"}>
                        <button className={style.btn}>About</button>
                    </NavLink>
                </div>
                <button className={style.logout} onClick={props.logout}>Logout</button>
            </div>
            <SearchBar onSearch={props.onSearch} />
        </div>
    )
}

export default Nav