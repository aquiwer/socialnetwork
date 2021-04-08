import React, {useState, useEffect, ChangeEvent} from 'react';
import styles from "./styles/Feed.module.css";
import Loader from "../../common/Loader/Loader";

type PropsType = {
    updateStatus: (newStatus: string) => void
    status: string
}
let Status: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

     useEffect(() => {
         setStatus(props.status)
     }, [props.status])
    let activeEditMode = () => {
        setEditMode(true)
    }

    let deActiveEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    let onStatusChange  = (e:ChangeEvent<HTMLInputElement>) =>{
        setStatus(e.currentTarget.value)
    }
        return (
            <>
                {!editMode &&
                    <div>
                        <span style={{wordBreak: "break-word", maxWidth: "100px",}} onDoubleClick={activeEditMode} >
                            {props.status || "Status is not defined"}
                        </span>
                    </div>
                }
                {editMode &&
                    <div>
                        <input
                            onChange={onStatusChange}
                            onBlur={deActiveEditMode}
                            value={status}
                            autoFocus={true} type="text" />
                    </div>
                }

            </>

        )

}

export default Status;