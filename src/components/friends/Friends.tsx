import React, {useEffect} from "react";
import styles from './styles/Friends.module.css'
import '../../generalFiles/general.css'
import {NavLink, useHistory} from "react-router-dom";
import avatar from "../../assets/imgs/home/unnamed.png";
import Paginator from "../../common/Paginator/Paginator";
import UserSearchForm from "../../common/Forms/FriendsFormik";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store/redux-store";
import {actions, getUsersThunkCreator} from "../../store/reducers/friendsReducer";
import { Pagination } from 'antd';
type PropsType = {
    user: any
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type QueryTypes = { term?: string; page?: string; friend?: string };
let Friends: React.FC<PropsType> = () => {
    const queryString = require('query-string');

    const totalUsersCount = useSelector((state: AppStateType) => state.friendPage.totalUsersCount)
    const currentPage = useSelector((state: AppStateType) => state.friendPage.currentPage)
    const pageSize = useSelector((state: AppStateType) => state.friendPage.pageSize)
    const users = useSelector((state: AppStateType) => state.friendPage.users)
    const filter = useSelector((state: AppStateType) => state.friendPage.filter)
    const searchError = useSelector((state: AppStateType) => state.friendPage.searchError)

    const dispatch = useDispatch();
    const history = useHistory()


    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryTypes

        let actualPage = currentPage;
        let actualFilter = filter;

        if (parsed.page) actualPage = Number(parsed.page);

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break
        }
        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryTypes = {}

        if (!!filter.term) query.term = filter.term

        if (filter.friend !== null) query.friend = String(filter.friend)

        if (currentPage !== 1) query.page = String(currentPage);

        history.push({
            pathname: '/friends',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
            // search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onChangePage = (currentPage: number) => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
    }

    const followThunk = (userId: number) => {
        dispatch(followThunk(userId))
    }

    const unFollowThunk = (userId: number) => {
        dispatch(unFollowThunk(userId))
    }
    const test = () => {
        dispatch(actions.setSearchError(true))
    }
    return (
        <div className={styles.friendsContainer}>
            <div>
                <UserSearchForm/>
            </div>
            {/*<Paginator pageSize={5} currentPage={1} totalItemCount={totalUsersCount}*/}
            {/*           onPageChanged={onChangePage}/>*/}
            <Pagination  className={styles.paginator} defaultPageSize={5} defaultCurrent={1} onChange={onChangePage} total={totalUsersCount}/>

            {
                users.length > 0 ? <ul className={styles.friendsList}>
                    {
                        users.map(user => {
                            return (
                                <li className={styles.friend} key={user.id}>
                                    <NavLink className={styles.friendsLink} to={`profile/${user.id}`}><img
                                        className={styles.friendPhoto}
                                        src={user.photos.small ? user.photos.small : avatar}
                                        alt=""/></NavLink>
                                    <div>
                                        {/*{*/}
                                        {/*    user.followed ? <button*/}

                                        {/*            onClick={() => {*/}
                                        {/*            followThunk(user.id)*/}
                                        {/*        }}><i className="fas fa-times"></i></button>*/}

                                        {/*        : <button onClick={() => {*/}
                                        {/*            unFollowThunk(user.id)*/}
                                        {/*        }}><i className="fas fa-check"></i></button>*/}
                                        {/*}*/}
                                    </div>
                                    <div className={styles.friendInitials}>
                                        <h4 className={styles.friendUser}>{user.name}</h4>
                                        <p className={styles.friendStatus}>{user.status ? user.status : "Status is not defined"}</p>
                                    </div>
                                </li>

                            )
                        },)
                    }
                </ul>
                :
                <h2>No one was found for your request. Try again!</h2>
            }
        </div>
    );
}


export default Friends;
