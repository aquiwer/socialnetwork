import React from "react";
import styles from './styles/Navbar.module.css'
import '../../generalFiles/general.css'
import {NavLink} from "react-router-dom";

let Navbar = (props) => {

    return (
        <>
            <div className={styles.navBarBlock}>
                <div className={styles.navList}>

                    <NavLink className={styles.navLink} to='/chat'>
                        <i className="far fa-comment"></i><span>Chat</span>
                    </NavLink>
                    <NavLink className={styles.navLink} to='/feed'>
                        <i className="fas fa-rss-square"></i><span>Feed</span>
                    </NavLink>
                    <NavLink className={styles.navLink} to='/profile/12177'>
                        <i className="fas fa-home"></i><span>Home</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
}
export default Navbar;