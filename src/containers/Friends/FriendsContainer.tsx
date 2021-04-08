import React from "react";
import {useSelector} from "react-redux";
import Friends from "../../components/friends/Friends";
import '../../generalFiles/general.css'
import Loader from "../../common/Loader/Loader";
import style from '../../components/friends/styles/Friends.module.css'
import {AppStateType} from "../../store/store/redux-store";

type FriendPagePropsType = { }

const FriendPage:React.FC<FriendPagePropsType> = (props) => {

    const isFetching = useSelector(((state: AppStateType) => state.friendPage.isFetching))

    return (
        <div className={style.friendLayout}>

            {
                isFetching ? <Loader/> : null
            }
            <Friends />
        </div>
    )
}

export default FriendPage;

