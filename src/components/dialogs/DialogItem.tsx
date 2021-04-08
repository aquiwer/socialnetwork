import React from "react";
import styles from './styles/Dialog.module.css'
import '../../generalFiles/general.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string
    id: number
    key: number
    photo: any

}

let DialogItem:React.FC<PropsType> = (props) => {
    let path = "/dialog/" + props.id;
    return (
        <NavLink className={styles.dialogLink} to={path}>
            <li className={styles.dialog}>
                <img className={styles.dialogPhoto} src={props.photo} alt=""/>
                <div>
                    <h4 className={styles.dialogUser}>{props.name}</h4>
                    <p className={styles.dialogStatus}>I'am a sexy bitch girl</p>
                </div>
            </li>
        </NavLink>
    );
}
export default DialogItem;