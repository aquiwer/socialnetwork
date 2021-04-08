import React from "react";
import styles from './styles/Header.module.css'
import '../../generalFiles/general.css'
import title from '../../../src/assets/imgs/header/title.png'
import {NavLink} from "react-router-dom";

type HeaderPropsTypes = {
    logout: () => void
    login: string | null
    isAuth: boolean
}
let Header = (props:HeaderPropsTypes) => {
    let logout = () => {
        props.logout()
    }
    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.headerLogoContainer}>
                    <h2>
                        {
                            props.isAuth
                                ? <div>
                                    {props.login}
                                    <NavLink onClick={() => logout()}  to='/login'>
                                        <i className="fas fa-sign-in-alt"></i>
                                    </NavLink>
                                </div>
                                : <NavLink className={styles.navLink} to='/login'>
                                    <i className="fas fa-sign-in-alt"></i>
                                </NavLink>

                        }
                    </h2>
                </div>
                <div className={styles.headerTitleContainer}>
                    <img className={styles.headerTitle} src={title} alt=""/>
                </div>
                <div className={styles.headerPhotoContainer}>
                    <NavLink to='/login'><img className={styles.headerPhoto} src="http://placehold.it/100x100" alt=""/></NavLink>
                </div>
            </div>
        </>
    );
}

export default Header;