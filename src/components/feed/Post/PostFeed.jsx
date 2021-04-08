import React from "react";
import styles from '../styles/PostFeed.module.css'
import '../../../generalFiles/general.css'

let PostFeed = (props) => {

    let postDay = new Date().getUTCDate();
    if(postDay < 10){
        postDay = "0" + postDay;
    }
    let postMonth = new Date().getMonth() + 1;
    if(postMonth < 10){
        postMonth = "0" + postMonth;
    }
    let postHour = new Date().getHours()
    if(postHour < 10){
        postMonth = "0" + postHour;
    }
    let postMinute = new Date().getMinutes()

    let postDate = `${postDay}.${postMonth}.${postHour}:${postMinute}`

    return (
        <div className={styles.postContainer}>
            <div className={styles.postAuthorContainer}>
                <div>
                    <img className={styles.postAuthorPhoto} src={props.photo} alt=""/>
                </div>
                <div className={styles.postAuthorInfoContainer}>
                    <div><h2 className={styles.postName}>{props.author}</h2></div>
                    <div><p className={styles.postDate}>{postDate}</p></div>
                </div>
            </div>
            <div className={styles.postContentContainer}>
                <p className={styles.postContent}>{props.post}</p>
            </div>
        </div>
    );
}
export default PostFeed;