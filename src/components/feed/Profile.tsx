import React, {useState} from 'react';
import styles from "./styles/Feed.module.css";
import avatar from "../../assets/imgs/home/unnamed.png";
import Loader from "../../common/Loader/Loader";
import Status from "./Status";

type ProfilePropsTypes = {
    sendInfo: (formData: string) => void
    updateStatus: () => void
    isOwner: boolean
    status: string
    profile: any
}
const Profile = (props: ProfilePropsTypes) => {


    let [editMode, setEditMode] = useState(false)

    let activateMode = () => {
        setEditMode(true)
    }

    let deActivateMode = () => {
        setEditMode(false)
    }

    let sendData = (formData: string) => {
        props.sendInfo(formData)
        deActivateMode()
    }

    if (!props.profile.profile) {
        return <Loader/>
    } else {
        return (
            <>
                <ProfileInfo activateMode={activateMode}  {...props}/>
            </>
        );
    }


}
const ProfileInfo = (props: any) => {

    return (
        <div className={styles.feedInitialContainer}>
            <div className={styles.feedPhotoContainer}>
                <img className={styles.feedPhoto}
                     src={props.profile.profile.photos.small ? props.profile.profile.photos.small : avatar}
                     alt="test"/>
                {props.isOwner && <input type={"file"} onChange={props.onPhotoChange} className={styles.feedPhotoButton}
                                         placeholder={"Обновить фотографию"}/>}
            </div>
            <div className={styles.feedInfoContainer}>
                <div className={styles.feedInfoName}>
                    <div>
                        <h2>{props.profile.profile.fullName ? props.profile.profile.fullName : "Dima"}</h2>
                        {/*<h2>Dima</h2>*/}
                    </div>
                    <div onClick={props.activateMode} className={styles.feedSetting}>
                        <i className="fas setting fa-cogs"></i>
                    </div>
                </div>
                <div className={styles.feedAbout}>
                    <Status updateStatus={props.updateStatus} status={props.status}/>
                    <p>Город: Киев</p>
                    <p>Семейное положение: в активном поиске</p>
                    <p>Работа: {props.profile.lookingForAJob ? "yes" : "no"} </p>
                    <p>Домашнее животное: кошка</p>
                </div>
                <div className={styles.feedCountsModule}>
                    <div className={styles.feedCount}>
                        <div>{props.profile.homePage.counts.friendsCount}</div>
                        <div>друга</div>
                    </div>
                    <div className={styles.feedCount}>
                        <div>{props.profile.homePage.counts.subsCount}</div>
                        <div>подписчика</div>
                    </div>
                    <div className={styles.feedCount}>
                        <div>{props.profile.homePage.counts.photoCount}</div>
                        <div>фотографий</div>
                    </div>
                    <div className={styles.feedCount}>
                        <div>{props.profile.homePage.counts.videoCount}</div>
                        <div>видео</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;