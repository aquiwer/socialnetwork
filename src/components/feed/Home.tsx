import React from "react";
import styles from './styles/Feed.module.css'
import '../../generalFiles/general.css'
import MyPosts from "./Post/MyPosts";
import Profile from "./Profile";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLength, requiredField} from "../../utils/validator/validator";
import {FormCreator} from "../../common/Forms/FormsControl";

let Textarea = FormCreator("textarea")
let maxLengthCreator = maxLength(300)

let HomeForm: React.FC<InjectedFormProps<HomeFormTypes>> = ({homePage}: any, props) => {
    // debugger
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                value={homePage.posts.post}
                component={Textarea} className={styles.feedPostField} name={'post'} placeholder="Что у вас нового?"/>
            <button className={styles.feedSendPost}>Send</button>
        </form>
    );
}
type HomeFormTypes = {
    post: string
}
let ReduxHomeForm = reduxForm<HomeFormTypes>({
    form: "post"
})(HomeForm);

type HomeTypes = {
    savePhoto: () => void
    sendInfo: () => void
    isOwner: boolean
    status: string
    UpdateStatus: () => void
    addNewPost: (post: any) => void
    homePage: any
    state: any
}

let Home: React.FC<HomeTypes> = (props) => {

    let addNewPost = (value: HomeFormTypes, e: React.FormEvent<EventTarget>) => {
        console.log(value.post)
        props.addNewPost(value.post)
        e.preventDefault()
    }
    return (
        <>
            <div className={styles.feedMain}>
                <Profile sendInfo={props.sendInfo} isOwner={props.isOwner} status={props.status}
                         updateStatus={props.UpdateStatus} profile={props}/>
                <div className={styles.feedPostsContainer}>
                    <div className={styles.feedPostFieldContainer}>
                        <ReduxHomeForm
                            // @ts-ignore
                            onSubmit={addNewPost}  {...props}/>
                    </div>
                    <div>
                        <MyPosts {...props}/>
                    </div>
                </div>
            </div>
        </>
    );
    debugger
}

export default Home;