import React from "react";
import styles from './styles/Dialog.module.css'
import '../../generalFiles/general.css'
import DialogItem from "./DialogItem";

type DialogType = {
    id: number | null,
    name: string | null,
    photo: string | null,
}
type PropsType = {
    dialogPage: any
    dialogData: DialogType
    isAuth: boolean
}
let Dialog:React.FC<PropsType> = ({dialogPage}) => {

    return (
        <div className={styles.dialogContainer}>
            <ul className={styles.dialogList}>
                {dialogPage.dialogData.map((info:{name: string; id: number; photo: string }) => <DialogItem name={info.name} id={info.id} key={info.id} photo={info.photo} />)}
            </ul>
        </div>
    );
}
export default Dialog;